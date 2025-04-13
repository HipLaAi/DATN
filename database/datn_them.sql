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
		SUBSTRING_INDEX(SUBSTRING_INDEX(c.user_id_join, ',', x.n), ',', -1) AS user_id,
		c.card_id,
		CONCAT('Thẻ "', c.name, '" sẽ hết hạn vào ', DATE_FORMAT(c.end_date, '%Y-%m-%d %H:%i:%s')) AS message,
		CASE 
			WHEN timer IS NULL THEN end_date
			ELSE timer
		END AS notify_time
	FROM 
		card c
	JOIN 
		(SELECT 1 AS n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5) x
	ON 
		CHAR_LENGTH(c.user_id_join) - CHAR_LENGTH(REPLACE(c.user_id_join, ',', '')) + 1 >= x.n
	WHERE 
		c.end_date > NOW() 
		AND c.end_date <= NOW() + INTERVAL 1 DAY
		AND NOT EXISTS (
			SELECT 1 
			FROM notification n 
			WHERE n.card_id = c.card_id 
			AND n.user_id = SUBSTRING_INDEX(SUBSTRING_INDEX(c.user_id_join, ',', x.n), ',', -1));
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

call GetNotificationByUserId(@msg,@err)

select * from notification;