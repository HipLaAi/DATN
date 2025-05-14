use datn;

-- notification
create table `notification`
(
`notification_id` int NOT NULL AUTO_INCREMENT,
`user_id` int not null,
`card_id` int default null,
`checklist_id` int default null,
`message` longtext,
`is_sent` boolean DEFAULT FALSE,
`is_read` boolean DEFAULT FALSE,
`notify_time` DATETIME NOT NULL,
`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key(`notification_id`),
foreign key (`card_id`) references `card`(`card_id`) on delete cascade on update cascade,
foreign key (`user_id`) references `user`(`user_id`) on delete cascade on update cascade,
foreign key (`checklist_id`) references `checklist`(`checklist_id`) on delete cascade on update cascade
);
-- /////////////////////////

SHOW VARIABLES LIKE 'event_scheduler';
SET GLOBAL event_scheduler = ON;
SHOW EVENTS;

DROP EVENT IF EXISTS check_expiring_card;

-- scheduler
DELIMITER //
CREATE EVENT check_expiring_card
ON SCHEDULE EVERY 1 MINUTE
DO
BEGIN
    INSERT INTO notification (user_id, card_id, message, notify_time) 
    SELECT 
		user_list.user_id,
		c.card_id,
		CONCAT('Thẻ "', c.name, '" sẽ hết hạn vào ', DATE_FORMAT(c.end_date, '%Y-%m-%d %H:%i:%s')) AS message,
		CASE 
			WHEN c.timer IS NULL THEN c.end_date
			ELSE c.timer
		END AS notify_time
	FROM 
		card c
	JOIN 
		`column` col
		ON col.column_id = c.column_id
	JOIN (
		SELECT DISTINCT c.card_id, user_id
		FROM card c
		LEFT JOIN (
			SELECT 
				c.card_id, 
				TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(c.user_id_join, ',', n.n), ',', -1)) AS user_id
			FROM card c
			JOIN (
				SELECT 1 AS n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
			) n
			ON CHAR_LENGTH(IFNULL(c.user_id_join, '')) - CHAR_LENGTH(REPLACE(IFNULL(c.user_id_join, ''), ',', '')) + 1 >= n.n
		) card_users
		ON c.card_id = card_users.card_id
		WHERE card_users.user_id IS NOT NULL AND card_users.user_id != ''

		UNION ALL

		SELECT 
			c.card_id, 
			g.user_id
		FROM card c
		JOIN `column` col
			ON col.column_id = c.column_id
		JOIN guest g
			ON g.board_id = col.board_id 
			AND g.role = 'own'
		WHERE NOT EXISTS (
			SELECT 1
			FROM card c_sub
			WHERE c_sub.card_id = c.card_id 
			  AND FIND_IN_SET(g.user_id, c_sub.user_id_join) > 0
		)

	) user_list
	ON user_list.card_id = c.card_id
	WHERE 
		c.end_date <= NOW() + INTERVAL 5 MINUTE
		AND NOT EXISTS (
			SELECT 1 
			FROM notification n
			WHERE n.card_id = c.card_id 
			AND n.user_id = user_list.user_id
		);
END //
DELIMITER ;
-- /////////////////////////

-- get notification
delimiter $$
create procedure GetNotificationByUserId (
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		select user_id, card_id, checklist_id, message, is_sent, is_read, notify_time 
        from notification
        where is_sent = false and notify_time <= now();	
    commit;
end $$
-- /////////////////////////

-- sửa lại thủ tục lấy không gian làm việc theo ID
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetWorkspaceByID`(
    IN p_workspace_id INT,
    IN p_user_id INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    SELECT 
        ws.workspace_id,
        ws.name,
        ws.logo,
        ws.description,
        ws.status,
        m.role,
        IF(
            COUNT(DISTINCT g.board_id) = 0,
            JSON_ARRAY(),
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'board_id', b.board_id,
                    'name', b.name,
                    'background', b.background,
                    'status', b.status
                )
            )
        ) AS board
    FROM 
        `WorkSpace` ws
    LEFT JOIN 
        `Member` m ON ws.workspace_id = m.workspace_id AND m.user_id = p_user_id
    LEFT JOIN 
        `Board` b ON b.workspace_id = ws.workspace_id
    LEFT JOIN 
        `Guest` g ON g.board_id = b.board_id AND g.user_id = p_user_id
    WHERE 
        (
            ws.status = 'public'
            OR 
            (ws.status = 'private' AND m.user_id = p_user_id)
        )
        AND 
        (
            ws.status = 'public'
            OR (
                b.board_id IS NULL
                OR (
                    b.status = 'public'
                    OR 
                    (b.status = 'workspace' AND m.user_id = p_user_id)
                    OR 
                    (b.status = 'private' AND g.user_id = p_user_id)
                )
            )
        )
        AND ws.workspace_id = p_workspace_id
    GROUP BY 
        ws.workspace_id, m.role;
END$$
DELIMITER ;

-- sửa lại bảng member
ALTER TABLE `member`
ADD `permission` longtext DEFAULT NULL;

-- sửa lại bảng guest
ALTER TABLE `guest`
ADD `permission` longtext DEFAULT NULL;

-- sửa lại thủ tục tạo bảng
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateBoard`(
in p_workspace_id varchar(100),
in p_name varchar(100),
in p_description longtext,
in p_background longtext,
in p_status varchar(50),
in p_user_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		insert into `board`(
        workspace_id,
        name,
        description,
        background,
        status
        )
        value(
		p_workspace_id,
        p_name,
        p_description,
        p_background,
        p_status
        );
        insert into `guest`(
        board_id,
        user_id,
        role
        )
        value(
        last_insert_id(),
        p_user_id,
        'own'
        );
        call GetBoardByID(last_insert_id(), p_user_id, @err, @msg);
    commit;
end$$
DELIMITER ;

-- setting workspace
create table `settingworkspace`
(
`settingworkspace_id` int NOT NULL AUTO_INCREMENT,
`workspace_id` int not null,
`action` varchar(250),
`permission` longtext,
primary key(`settingworkspace_id`),
foreign key (`workspace_id`) references `workspace`(`workspace_id`) on delete cascade on update cascade
);

-- thủ tục thêm setting cho workspace
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateSettingWorkspace`(
in p_workspace_id int,
in p_action varchar(250),
in p_permission longtext,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		insert into `settingworkspace`(
        workspace_id,
        action,
        permission
        )
        value(
        p_workspace_id,
        p_action,
        p_permission
        );
    commit;
end$$
DELIMITER;

-- sửa lại thủ tục tạo không gian làm việc
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateWorkspace`(
in p_name varchar(100),
in p_description longtext,
in p_status varchar(50),
in p_logo longtext,
in p_user_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
    declare p_workspace_id int;
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
        ROLLBACK;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		insert into `workspace`(
        name,
        description,
        logo,
        status
        )
        value(
        p_name,
        p_description,
        p_logo,
        p_status
        );
        set p_workspace_id = last_insert_id();
        insert into `member`(
        workspace_id,
        user_id,
        role
        )
        value(
        p_workspace_id,
        p_user_id,
        'own'
        );
		call CreateSettingWorkspace(p_workspace_id,'createboard','{"public": "all member", "workspace": "all member", "private": "all member"}', @err, @msg);
		call CreateSettingWorkspace(p_workspace_id,'deleteboard','{"public": "all member", "workspace": "all member", "private": "all member"}', @err, @msg);
		call CreateSettingWorkspace(p_workspace_id,'invitemember','{"status": "all member"}', @err, @msg);
        call GetWorkspaceByID(p_workspace_id, p_user_id, @err, @msg);
    commit;
end$$
DELIMITER ;

-- thủ tục lấy setting của workspace
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSettingWorkspaceByID`(
in p_workspace_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;        
        SELECT 
        workspace_id,
		JSON_ARRAYAGG(
               JSON_OBJECT(
					'settingworkspace_id', settingworkspace_id,
                   'action', action,
                   'permission', JSON_EXTRACT(permission, '$')
               )
       ) AS setting
		FROM settingworkspace
		WHERE workspace_id = p_workspace_id
		GROUP BY workspace_id;
	commit;
end$$
DELIMITER ;

-- thủ tục cập nhật setting không gian làm việc
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateSettingWorkspace`(
in p_settingworkspace_id int,
in p_workspace_id int,
in p_action varchar(250),
in p_permission longtext,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		update `settingworkspace`
		set
		`action` = p_action,
        `permission` = p_permission
		where `settingworkspace_id` = p_settingworkspace_id and `workspace_id` = p_workspace_id;
	commit;
end$$
DELIMITER ;


-- /////////////////////////////////////////////////////////////////////////

-- setting board
create table `settingboard`
(
`settingboard_id` int NOT NULL AUTO_INCREMENT,
`board_id` int not null,
`action` varchar(250),
`permission` longtext,
primary key(`settingboard_id`),
foreign key (`board_id`) references `board`(`board_id`) on delete cascade on update cascade
);

-- thủ tục thêm setting cho board
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateSettingBoard`(
in p_board_id int,
in p_action varchar(250),
in p_permission longtext,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		insert into `settingboard`(
        board_id,
        action,
        permission
        )
        value(
        p_board_id,
        p_action,
        p_permission
        );
    commit;
end$$
DELIMITER ;

-- sửa lại thủ tục tạo bảng
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateBoard`(
in p_workspace_id varchar(100),
in p_name varchar(100),
in p_description longtext,
in p_background longtext,
in p_status varchar(50),
in p_user_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
    declare p_board_id int;
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		insert into `board`(
        workspace_id,
        name,
        description,
        background,
        status
        )
        value(
		p_workspace_id,
        p_name,
        p_description,
        p_background,
        p_status
        );
		set p_board_id = last_insert_id();
        insert into `guest`(
        board_id,
        user_id,
        role
        )
        value(
        p_board_id,
        p_user_id,
        'own'
        );
		call CreateSettingBoard(p_board_id,'guest','all guest', @err, @msg);
		call CreateSettingBoard(p_board_id,'create','all guest', @err, @msg);		
        call CreateSettingBoard(p_board_id,'delete','all guest', @err, @msg);
		call CreateSettingBoard(p_board_id,'comment','all guest', @err, @msg);		
        call CreateSettingBoard(p_board_id,'move','all guest', @err, @msg);
        call CreateLabelBoard(p_board_id,'','#4bce97', @err, @msg);
		call CreateLabelBoard(p_board_id,'','#f5cd47', @err, @msg);
        call CreateLabelBoard(p_board_id,'','#dfd8fd', @err, @msg);
        call CreateLabelBoard(p_board_id,'','#6e5dc6', @err, @msg);
        call CreateLabelBoard(p_board_id,'','#0055cc', @err, @msg);
        call GetBoardByID(p_board_id, p_user_id, @err, @msg);
    commit;
end$$
DELIMITER ;

-- thủ tục lấy setting của board
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSettingBoardByID`(
in p_board_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;        
        SELECT *
		FROM settingboard
		WHERE board_id = p_board_id;
	commit;
end$$
DELIMITER ;

-- thủ tục cập nhật setting board
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateSettingBoard`(
in p_board_id int,
in p_action varchar(250),
in p_permission longtext,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		update `settingboard`
		set
        `permission` = p_permission
		where `action` = p_action and `board_id` = p_board_id;
	commit;
end$$
DELIMITER ;

-- thủ tục cập nhật logo không gian làm việc
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateLogoWorkspace`(
in p_workspace_id int,
in p_logo longtext,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare old_path longtext default null;
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		set old_path = (select logo from workspace where workspace_id = p_workspace_id);
		update `workspace`
		set
		`logo` = p_logo
		where `workspace_id` = p_workspace_id;
        select old_path;
	commit;
end$$
DELIMITER ;

-- thủ tục cập nhật thông tin không gian làm việc
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateIWorkspace`(
in p_workspace_id int,
in p_name varchar(100),
in p_description longtext,
in p_status varchar(50),
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		update `workspace`
		set
		`name` = p_name,
		`description` = p_description,
		`status` = p_status
		where `workspace_id` = p_workspace_id;
	commit;
end$$
DELIMITER ;

-- thủ tục cập nhật quyền của bảng thành viên không gian làm việc
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateRoleMember`(
in p_workspace_id int,
in p_user_id int,
in p_role varchar(100),
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		update `member`
		set
		`role` = p_role
		where `workspace_id` = p_workspace_id and `user_id` = p_user_id;
	commit;
end$$
DELIMITER ;

-- sửa thủ tục lấy khách trong không gian làm việc
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetGuestByWorkspaceID`(
    in p_workspace_id int,
    out p_error_code int,
    out p_error_message varchar(500)
)
begin
    declare exit handler for sqlexception
    begin
        get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
	select u.user_id, u.name, u.email, u.avatar, g.role,
		JSON_ARRAYAGG(
			   JSON_OBJECT(
				   'board_id', b.board_id,
				   'name', b.name,
				   'background', b.background
			   )
	   ) AS board    
    from board b 
	right join guest g on g.board_id = b.board_id
	left join user u on u.user_id = g.user_id
	where workspace_id = p_workspace_id and g.user_id not in (select user_id from `member` where workspace_id = p_workspace_id)
    group by u.user_id, u.name, u.email, u.avatar, g.role;
    commit;
end$$
DELIMITER ;

-- sửa thủ tục cập nhật thông tin bảng
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateIBoard`(
in p_board_id int,
in p_workspace_id int,
in p_name varchar(100),
in p_description longtext,
in p_status varchar(50),
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		update `board`
		set
        `workspace_id` = p_workspace_id,
		`name` = p_name,
		`description` = p_description,
		`status` = p_status
		where `board_id` = p_board_id;
	commit;
end$$
DELIMITER ;

-- thủ tục cập nhật background bảng
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateBackgroundBoard`(
in p_board_id int,
in p_background longtext,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare old_path longtext default null;
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		set old_path = (select background from board where board_id = p_board_id);
		update `board`
		set
		`background` = p_background
		where `board_id` = p_board_id;
        select old_path;
	commit;
end$$
DELIMITER ;

-- label cho bảng
create table `labelboard`
(
`labelboard_id` int NOT NULL AUTO_INCREMENT,
`board_id` int not null,
`name` varchar(250),
`background` longtext,
primary key(`labelboard_id`),
foreign key (`board_id`) references `board`(`board_id`) on delete cascade on update cascade
);

-- sửa lại bảng label cho card
CREATE TABLE `label` 
(
`label_id` int NOT NULL AUTO_INCREMENT,
`labelboard_id` int NOT NULL,
`card_id` int NOT NULL,
primary key(`label_id`),
foreign key (`labelboard_id`) references `labelboard`(`labelboard_id`) on delete cascade on update cascade,
foreign key (`card_id`) references `card`(`card_id`) on delete cascade on update cascade
);

-- sửa lại thủ tục lấy bảng theo ID
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetBoardById`(
in p_board_id int,
in p_user_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		SELECT 
		b.board_id,
        b.workspace_id,
		b.name,
		b.description,
		b.background,
        b.status,
        g.role,
        g.permission,
		b.column_id_order,
		(SELECT JSON_ARRAYAGG(
			   JSON_OBJECT('column_id', sorted_columns.column_id, 
							'name', sorted_columns.name, 
                            'background', sorted_columns.background,
                            'status', sorted_columns.status,
							'card',
									(SELECT JSON_ARRAYAGG(
										   JSON_OBJECT('card_id', sorted_cards.card_id, 
														'name', sorted_cards.name,
                                                        'background', sorted_cards.background, 
                                                        'status', sorted_cards.status,
                                                        'userjoin',
                                                        (SELECT JSON_ARRAYAGG(
															   JSON_OBJECT(
																   'user_id', u.user_id, 
																   'name', u.name,
																   'email', u.email,
																   'avatar', u.avatar
																   )
															) 
														 FROM `user` u
														 WHERE FIND_IN_SET(u.user_id, (SELECT user_id_join FROM `card` WHERE card_id = sorted_cards.card_id)) > 0
                                                         ),
                                                         'label',
                                                        (SELECT JSON_ARRAYAGG(
															   JSON_OBJECT(
																   'label_id', l.label_id, 
																   'name', lb.name,
																   'background', lb.background
																   )
															) 
														 FROM `label` l
                                                         JOIN `labelboard` lb ON l.labelboard_id = lb.labelboard_id
														 WHERE l.card_id = sorted_cards.card_id
                                                         )
										   )
									   ) 
									FROM (
										SELECT 
											cd.card_id, 
											cd.name,
                                            cd.background,
                                            cd.status,
											FIND_IN_SET(cd.card_id, (SELECT card_id_order FROM `column` WHERE column_id = sorted_columns.column_id)) AS order_value
										FROM `card` cd
										RIGHT JOIN `column` cl ON cl.column_id = cd.column_id
										WHERE FIND_IN_SET(cd.card_id, (SELECT card_id_order FROM `column` WHERE column_id = sorted_columns.column_id)) > 0
										ORDER BY order_value
										) AS sorted_cards
									)
			   )
		   ) 
		FROM (
			SELECT 
				cl.column_id, 
				cl.name,
                cl.background,
                cl.status,
				FIND_IN_SET(cl.column_id, (SELECT column_id_order FROM board WHERE board_id = p_board_id)) AS order_value
			FROM `column` cl
			RIGHT JOIN `board` bd ON bd.board_id = cl.board_id
			WHERE FIND_IN_SET(cl.column_id, (SELECT column_id_order FROM board WHERE board_id = p_board_id)) > 0
			ORDER BY order_value
			) AS sorted_columns
		) AS `column`,
		(SELECT JSON_ARRAYAGG(
               JSON_OBJECT(
                   'user_id', g.user_id, 
                   'name', u.name,
                   'email', u.email,
                   'avatar', u.avatar,
                   'status', u.status,
                   'role', g.role
				   )
			   ) 
		 FROM `guest` g
		 LEFT JOIN `user` u ON g.user_id = u.user_id
		 WHERE g.board_id = b.board_id
		) AS `guest`
	FROM 
		`board` b
	LEFT JOIN 
        `Member` m ON b.workspace_id = m.workspace_id AND m.user_id = p_user_id
    LEFT JOIN 
        `Guest` g ON g.board_id = b.board_id AND g.user_id = p_user_id
	WHERE 
        (
			b.status = 'public'
			OR 
			(b.status = 'workspace' AND (m.user_id = p_user_id or g.user_id = p_user_id))
			OR 
			(b.status = 'private' AND g.user_id = p_user_id)
        )
        AND b.board_id = p_board_id;
	commit;
end$$
DELIMITER ;

-- sửa lại thủ tục lấy thông tin card theo ID
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCardByID`(
    IN p_card_id INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';
    START TRANSACTION;

    SELECT 
        col.name AS 'column_name',
        cd.card_id, 
        cd.column_id, 
        cd.name, 
        cd.description, 
        cd.background, 
        cd.user_id_join, 
        cd.start_date, 
        cd.end_date, 
        cd.timer, 
        cd.status,

        -- Lấy thông tin người tham gia
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'user_id', u.user_id, 
                    'name', u.name, 
                    'email', u.email, 
                    'avatar', u.avatar
                )
            )
            FROM `user` u
            WHERE FIND_IN_SET(u.user_id, (SELECT user_id_join FROM `card` WHERE card_id = p_card_id)) > 0
        ) AS 'userjoin',

        -- Lấy thông tin checklist
        (
            SELECT 
                IF(
                    COUNT(cln.checklistname_id) = 0,
                    JSON_ARRAY(),
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'checklistname_id', cln.checklistname_id,
                            'name', cln.name,
                            'checklist', 
                            COALESCE(
                                (
                                    SELECT 
                                        JSON_ARRAYAGG(
                                            JSON_OBJECT(
                                                'checklist_id', cl.checklist_id,
                                                'user_id', cl.user_id,
                                                'name', cl.name,
                                                'timer', cl.timer,
                                                'status', cl.status
                                            )
                                        )
                                    FROM `checklist` cl 
                                    WHERE cl.checklistname_id = cln.checklistname_id
                                ), 
                                JSON_ARRAY()
                            )
                        )
                    )
                )
            FROM `checklistname` cln 
            WHERE cln.card_id = cd.card_id
        ) AS `checklistname`,

        -- Lấy thông tin comment
        (
            SELECT 
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'comment_id', comment_data.comment_id,
                        'user_name', comment_data.user_name,
                        'user_avatar', comment_data.user_avatar,
                        'comment', comment_data.comment,
                        'timestamp', comment_data.timestamp
                    )
                )
            FROM (
                SELECT DISTINCT 
                    cm.comment_id,
                    u.name AS user_name,
                    u.avatar AS user_avatar,
                    cm.comment,
                    cm.timestamp
                FROM `comment` cm
                LEFT JOIN `user` u ON cm.user_id = u.user_id
                WHERE cm.card_id = cd.card_id
                ORDER BY cm.comment_id DESC
            ) AS comment_data
        ) AS `comment`,

        -- Lấy thông tin file
        (
            SELECT 
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'file_id', f.file_id,
                        'user_id', f.user_id,
                        'path', f.path
                    )
                )
            FROM `file` f
            WHERE f.card_id = cd.card_id
        ) AS `file`,

        -- Lấy thông tin label
        (
            SELECT 
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'label_id', l.label_id,
                        'labelboard_id', l.labelboard_id,
                        'name', lb.name,
                        'background', lb.background
                    )
                )
            FROM `label` l
            INNER JOIN `labelboard` lb ON l.labelboard_id = lb.labelboard_id
            WHERE l.card_id = p_card_id
        ) AS `label`

    FROM `card` cd
    LEFT JOIN `column` col ON cd.column_id = col.column_id
    WHERE cd.card_id = p_card_id;

    COMMIT;
END$$
DELIMITER ;







-- thủ tục thêm lable board
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateLabelBoard`(
in p_board_id int,
in p_name varchar(250),
in p_background longtext,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		insert into `labelboard`(
        board_id,
        name,
        background
        )
        value(
        p_board_id,
        p_name,
        p_background
        );
    commit;
end$$
DELIMITER ;

-- thủ tục lấy label của board
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetLabelBoardByID`(
in p_board_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;        
        SELECT *
		FROM labelboard
		WHERE board_id = p_board_id;
	commit;
end$$
DELIMITER ;

-- thủ tục cập nhật label board
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateLabelBoard`(
in p_labelboard_id int,
in p_board_id int,
in p_name varchar(250),
in p_background longtext,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
        update `labelboard`
		set
		`name` = p_name,
		`background` = p_background
		where `labelboard_id` = p_labelboard_id and `board_id` = p_board_id;
    commit;
end$$
DELIMITER ;

-- thủ tục xóa label board
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteLabelBoard`(
in p_labelboard_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
        delete from `labelboard`
		where `labelboard_id` = p_labelboard_id;
    commit;
end$$
DELIMITER ;

-- thủ tục gán lable
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateLabel`(
in p_labelboard_id int,
in p_card_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		insert into `label`(
        labelboard_id,
        card_id
        )
        value(
        p_labelboard_id,
        p_card_id
        );
        select lb.name, lb.background, lb.labelboard_id, l.label_id from label l
        join labelboard lb on l.labelboard_id = lb.labelboard_id
        where l.label_id = last_insert_id();
    commit;
end$$
DELIMITER ;

-- thủ tục xóa label
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteLabel`(
in p_label_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
        delete from `label`
		where `label_id` = p_label_id ;
    commit;
end$$
DELIMITER ;

-- sửa lại thủ tục update checklist
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateCheckList`(
in p_checklist_id int,
in p_user_id int,
in p_name varchar(100),
in p_timer datetime,
in p_status varchar(50),
in p_card_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		update `checklist`
		set
        `user_id` = p_user_id,
		`name` = p_name,
        `timer` = p_timer,
        `status` = p_status
		where `checklist_id` = p_checklist_id;
        call GetCardByID(p_card_id, @err, @msg);
	commit;
end$$
DELIMITER ;

-- setting card
create table `settingcard`
(
`settingcard_id` int NOT NULL AUTO_INCREMENT,
`card_id` int not null,
`action` varchar(250),
`permission` longtext,
primary key(`settingcard_id`),
foreign key (`card_id`) references `card`(`card_id`) on delete cascade on update cascade
);

-- thủ tục thêm setting cho card
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateSettingCard`(
in p_card_id int,
in p_action varchar(250),
in p_permission longtext,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		insert into `settingcard`(
        card_id,
        action,
        permission
        )
        value(
        p_card_id,
        p_action,
        p_permission
        );
    commit;
end$$
DELIMITER ;

-- sửa thủ tục tạo card
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateCard`(
in p_column_id varchar(100),
in p_name varchar(100),
in p_status varchar(50),
out p_error_code int,
out p_error_message varchar(500)
)
begin
    declare p_card_id int;
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		insert into `card`(
        column_id,
        name,
        status
        )
        value(
		p_column_id,
        p_name,
        p_status
        );
        set p_card_id = last_insert_id();
		call CreateSettingCard(p_card_id,'invite','all guest', @err, @msg);
		call CreateSettingCard(p_card_id,'checklist','all guest', @err, @msg);		
        call CreateSettingCard(p_card_id,'handle','all guest', @err, @msg);
		select * from `card` where card_id = p_card_id;
    commit;
end$$
DELIMITER ;

-- thủ tục lấy setting của card
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSettingCardByID`(
in p_card_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;        
        SELECT *
		FROM settingcard
		WHERE card_id = p_card_id;
	commit;
end$$
DELIMITER ;

-- thủ tục cập nhật setting card
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateSettingCard`(
in p_card_id int,
in p_action varchar(250),
in p_permission longtext,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		update `settingcard`
		set
        `permission` = p_permission
		where `action` = p_action and `card_id` = p_card_id;
	commit;
end$$
DELIMITER ;

-- thủ tục thêm comment
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateComment`(
in p_card_id int,
in p_user_id int,
in p_comment longtext,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		insert into `comment`(
        card_id,
        user_id,
        comment
        )
        value(
        p_card_id,
        p_user_id,
        p_comment
        );
        select cm.comment_id, u.name as `user_name`, u.avatar as `user_avatar`, cm.comment, cm.timestamp 
        from comment cm
        left join user u on u.user_id = cm.user_id
        where comment_id = last_insert_id();
    commit;
end$$
DELIMITER ;

-- thủ tục cập nhật comment
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateComment`(
in p_comment_id int,
in p_comment longtext,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		update `comment`
        set comment = p_comment
        where comment_id = p_comment_id;
    commit;
end$$
DELIMITER ;

-- thủ tục xóa comment
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteComment`(
in p_comment_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		delete from `comment` where comment_id = p_comment_id;
    commit;
end$$
DELIMITER ;


-- activitycard
create table `activitycard`
(
`activitycard_id` int NOT NULL AUTO_INCREMENT,
`user_id` int not null,
`card_id` int not null,
`description` longtext,
`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
primary key(`activitycard_id`),
foreign key (`card_id`) references `card`(`card_id`) on delete cascade on update cascade,
foreign key (`user_id`) references `user`(`user_id`) on delete cascade on update cascade
);
-- /////////////////////////


-- thủ tục thêm hoạt động của thẻ
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateActivityCard`(
in p_card_id int,
in p_user_id int,
in p_description longtext,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		insert into `activitycard`(
        card_id,
        user_id,
        description
        )
        value(
        p_card_id,
        p_user_id,
        p_description
        );
        select ac.activitycard_id, u.name as `user_name`, u.avatar as `user_avatar`, ac.description, ac.created_at 
        from activitycard ac
        left join user u on u.user_id = ac.user_id
        where activitycard_id = last_insert_id();
    commit;
end$$
DELIMITER ;

-- thủ tục lấy hoạt động của thẻ theo id
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetActivityCardByID`(
in p_card_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
        select ac.activitycard_id, u.name as `user_name`, u.avatar as `user_avatar`, ac.description, ac.created_at 
        from activitycard ac
        left join user u on u.user_id = ac.user_id
        where card_id = p_card_id
        order by activitycard_id desc;
    commit;
end$$
DELIMITER ;






