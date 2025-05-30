CREATE DATABASE  IF NOT EXISTS `datn` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `datn`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: datn
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activitycard`
--

DROP TABLE IF EXISTS `activitycard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activitycard` (
  `activitycard_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `card_id` int NOT NULL,
  `description` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`activitycard_id`),
  KEY `card_id` (`card_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `activitycard_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `activitycard_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activitycard`
--

LOCK TABLES `activitycard` WRITE;
/*!40000 ALTER TABLE `activitycard` DISABLE KEYS */;
INSERT INTO `activitycard` VALUES (67,46,187,'đã thêm danh sách công việc Nghiên cứu và phân tích yêu cầu vào thẻ này','2025-05-26 09:00:52'),(68,46,187,'đã thêm danh sách công việc Xây dựng sơ đồ chức năng vào thẻ này','2025-05-26 09:03:32'),(69,46,187,'đã cập nhật trạng thái công việc \"Tạo sơ đồ mô tả mối quan hệ giữa các bảng\" của thẻ này','2025-05-26 09:15:26'),(70,46,187,'đã cập nhật trạng thái công việc \"Tìm hiểu cách hoạt động của các hệ thống tương tự\" của thẻ này','2025-05-26 09:15:27'),(71,46,187,'đã cập nhật trạng thái công việc \"Phân tích các tính năng cốt lõi\" của thẻ này','2025-05-26 09:15:28'),(72,46,187,'đã cập nhật trạng thái công việc \"Tạo sơ đồ mô tả mối quan hệ giữa các bảng\" của thẻ này','2025-05-26 09:15:32'),(73,46,187,'đã tham gia thẻ này','2025-05-26 10:35:52'),(74,46,187,'đã cập nhật trạng thái công việc \"Tạo sơ đồ mô tả mối quan hệ giữa các bảng\" của thẻ này','2025-05-27 03:00:48'),(75,46,197,'đã tham gia thẻ này','2025-05-27 08:24:14'),(76,46,188,'đã thêm danh sách công việc Phân tích yêu cầu về vai trò và quyền vào thẻ này','2025-05-27 08:40:08'),(77,46,188,'đã thêm danh sách công việc Xây dựng bảng quan hệ vai trò và quyền vào thẻ này','2025-05-27 08:47:28'),(78,46,188,'đã xóa danh sách công việc \"Xây dựng bảng quan hệ vai trò và quyền\" của thẻ này','2025-05-27 08:47:51'),(79,46,189,'đã thêm danh sách công việc Thu thập yêu cầu nghiệp vụ vào thẻ này','2025-05-27 08:51:32'),(80,46,190,'đã thêm danh sách công việc Nghiên cứu các hệ thống tương tự vào thẻ này','2025-05-27 08:54:45'),(81,46,190,'đã thêm danh sách công việc Xây dựng danh sách tính năng chính vào thẻ này','2025-05-27 08:55:07'),(82,46,203,'đã thêm danh sách công việc Công việc cần làm vào thẻ này','2025-05-27 09:23:11'),(83,46,204,'đã thêm danh sách công việc Công việc cần làm vào thẻ này','2025-05-27 09:26:11'),(84,46,205,'đã thêm danh sách công việc Công việc cần làm vào thẻ này','2025-05-27 09:27:33'),(85,46,206,'đã thêm danh sách công việc Việc cần làm vào thẻ này','2025-05-27 09:30:17'),(86,46,207,'đã thêm danh sách công việc Công việc cần làm vào thẻ này','2025-05-27 09:33:48'),(87,46,208,'đã thêm danh sách công việc Công việc cần làm vào thẻ này','2025-05-27 09:52:30'),(88,46,209,'đã thêm danh sách công việc Việc cần làm vào thẻ này','2025-05-27 09:53:27'),(90,46,211,'đã thêm danh sách công việc Công việc cần thực hiện vào thẻ này','2025-05-27 12:55:03'),(91,46,212,'đã thêm danh sách công việc Xem video bài giảng về thì Hiện tại. vào thẻ này','2025-05-27 12:55:53'),(92,46,212,'đã xóa danh sách công việc \"Xem video bài giảng về thì Hiện tại.\" của thẻ này','2025-05-27 12:55:57'),(93,46,212,'đã thêm danh sách công việc Công việc cần thực hiện vào thẻ này','2025-05-27 12:56:07'),(94,46,213,'đã thêm danh sách công việc Công việc cần làm vào thẻ này','2025-05-27 12:56:41'),(95,46,188,'đã tham gia thẻ này','2025-05-30 05:19:20'),(96,46,189,'đã tham gia thẻ này','2025-05-30 05:19:23'),(97,45,214,'đã tham gia thẻ này','2025-05-30 16:21:52'),(98,45,214,'đã rời khỏi thẻ này','2025-05-30 16:21:54');
/*!40000 ALTER TABLE `activitycard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activityuser`
--

DROP TABLE IF EXISTS `activityuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activityuser` (
  `activityuser_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `device` varchar(255) DEFAULT NULL,
  `browser` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`activityuser_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `activityuser_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activityuser`
--

LOCK TABLES `activityuser` WRITE;
/*!40000 ALTER TABLE `activityuser` DISABLE KEYS */;
INSERT INTO `activityuser` VALUES (33,42,'refreshToken','171.225.202.21','2025-05-17 01:47:41','Desktop','Chrome','/','Success'),(37,42,'refreshToken','171.225.202.123','2025-05-19 16:30:27','Desktop','Chrome','/workspace/89/board/59/table','Success'),(45,42,'refreshToken','171.225.202.123','2025-05-20 15:03:35','Desktop','Chrome','/workspace/89/collab/guest','Success'),(59,42,'refreshToken','171.225.202.123','2025-05-23 09:01:20','Desktop','Edge','/admin/user','Success'),(60,43,'refreshToken','171.225.202.123','2025-05-23 09:24:25','Desktop','Chrome','/login','Success'),(61,43,'refreshToken',NULL,'2025-05-23 09:24:28','Desktop','Chrome','/login','Success'),(62,43,'refreshToken',NULL,'2025-05-23 09:24:28','Desktop','Chrome','/login','Success'),(63,43,'refreshToken',NULL,'2025-05-23 09:24:28','Desktop','Chrome','/login','Success'),(64,43,'refreshToken',NULL,'2025-05-23 09:24:28','Desktop','Chrome','/login','Success'),(66,43,'refreshToken',NULL,'2025-05-23 09:24:28','Desktop','Chrome','/login','Success'),(68,45,'refreshToken','171.225.202.123','2025-05-23 16:37:08','Desktop','Edge','/message','Success'),(69,45,'refreshToken','171.225.202.123','2025-05-23 17:44:16','Desktop','Edge','/message','Success'),(70,45,'refreshToken','171.225.202.79','2025-05-24 01:44:20','Desktop','Edge','/','Success'),(73,45,'refreshToken','171.225.202.42','2025-05-25 14:18:06','Desktop','Chrome','/','Success'),(74,45,'refreshToken',NULL,'2025-05-25 14:18:07','Desktop','Chrome','/board','Success'),(75,45,'refreshToken',NULL,'2025-05-25 14:18:07','Desktop','Chrome','/board','Success'),(76,45,'refreshToken',NULL,'2025-05-25 14:18:07','Desktop','Chrome','/board','Success'),(78,46,'refreshToken','171.225.202.42','2025-05-26 07:48:18','Desktop','Edge','/','Success'),(79,45,'refreshToken','171.225.202.42','2025-05-26 09:21:57','Desktop','Chrome','/workspace/97/board/67','Success'),(80,46,'refreshToken','171.225.202.42','2025-05-26 17:00:02','Desktop','Edge','/','Success'),(81,45,'refreshToken','171.225.202.42','2025-05-26 17:02:45','Desktop','Chrome','/workspace/97/board/67','Success'),(82,46,'refreshToken','59.153.249.69','2025-05-28 01:19:07','Desktop','Edge','/','Success'),(83,45,'refreshToken','59.153.249.69','2025-05-28 01:19:11','Desktop','Chrome','/','Success'),(84,46,'refreshToken','171.225.202.42','2025-05-30 05:19:08','Desktop','Edge','/','Success'),(85,42,'refreshToken','171.225.202.42','2025-05-30 05:56:13','Desktop','Edge','/admin/report','Success'),(86,45,'refreshToken','171.225.202.42','2025-05-30 12:23:43','Desktop','Chrome','/','Success');
/*!40000 ALTER TABLE `activityuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` int NOT NULL AUTO_INCREMENT,
  `workspace_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` longtext,
  `background` longtext,
  `column_id_order` longtext,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `workspace_id` (`workspace_id`),
  CONSTRAINT `board_ibfk_1` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`workspace_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (67,97,'Thiết kế CSDL','','https://res.cloudinary.com/dqkog9xuj/image/upload/v1748247725/uploads/xanh-232740784.jpg.jpg','66,68,67','public'),(68,97,'Xây dựng API','','https://res.cloudinary.com/dqkog9xuj/image/upload/v1748247754/uploads/x%C3%83%C2%A1m-465971696.jpg.jpg','','workspace'),(69,97,'Thiết kế giao diện',NULL,'https://res.cloudinary.com/dqkog9xuj/image/upload/v1748251238/uploads/xanh%20n%C3%86%C2%B0%C3%A1%C2%BB%C2%9Bc%20bi%C3%A1%C2%BB%C2%83n-329607841.jpg.jpg',NULL,'workspace'),(70,98,'Chiến lược phát triển sản phẩm','','https://res.cloudinary.com/dqkog9xuj/image/upload/v1748311428/uploads/cam-621902292.jpg.jpg','71,72,73','workspace'),(72,97,'Báo cáo','','https://res.cloudinary.com/dqkog9xuj/image/upload/v1748313211/uploads/cam-221751671.jpg.jpg',NULL,'public'),(73,98,'Kế hoạch tài chính',NULL,'https://res.cloudinary.com/dqkog9xuj/image/upload/v1748339487/uploads/%C3%84%C2%91%C3%A1%C2%BB%C2%8F-853747889.jpg.jpg','74,75','workspace'),(74,98,'Phát triển đội ngũ kinh doanh',NULL,'https://res.cloudinary.com/dqkog9xuj/image/upload/v1748339674/uploads/t%C3%83%C2%ADm-565367881.jpg.jpg',NULL,'workspace'),(76,101,'Học tiếng Anh','','https://res.cloudinary.com/dqkog9xuj/image/upload/v1748350424/uploads/h%C3%A1%C2%BB%C2%93ng%20%C3%84%C2%91%C3%A1%C2%BA%C2%B9p-611968294.jpg.jpg','76,77,78','public');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `card_id` int NOT NULL AUTO_INCREMENT,
  `column_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` longtext,
  `background` longtext,
  `user_id_join` longtext,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `timer` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`card_id`),
  KEY `column_id` (`column_id`),
  CONSTRAINT `card_ibfk_1` FOREIGN KEY (`column_id`) REFERENCES `column` (`column_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (187,66,'Thu thập yêu cầu về quản lý không gian làm việc, bảng, danh sách, thẻ.','<h3>Thu thập và phân tích các yêu cầu <em>chức năng</em> và <em>phi chức năng</em> để thiết kế hệ thống quản lý:</h3><ul><li>không gian làm việc (workspace),</li><li>bảng (board),</li><li>danh sách (list)</li><li>thẻ (card).</li><li>................</li></ul><p><br></p><h3>Mục tiêu là xác định các thành phần cần thiết, mối quan hệ giữa chúng và tính năng hỗ trợ người dùng trong việc quản lý công việc theo mô hình Trello.</h3>',NULL,'46','2025-03-24 00:00:00','2025-03-30 00:00:00',NULL,'true'),(188,66,'Xác định các mối quan hệ giữa người dùng, vai trò, và quyền truy cập.','<h3><strong>Mối quan hệ giữa người dùng, vai trò, và quyền truy cập là yếu tố quan trọng trong việc thiết kế và triển khai hệ thống phân quyền. </strong></h3><p><br></p><h3>Cần xác định các vai trò cụ thể, quyền mà từng vai trò có thể thực hiện, và cách liên kết giữa người dùng và vai trò để đảm bảo tính an toàn, minh bạch, và dễ dàng quản lý trong hệ thống.</h3>',NULL,'46','2025-05-28 08:19:41','2025-05-28 08:21:00',NULL,'true'),(189,66,'Xây dựng mô hình thực thể - liên kết (ERD)','<h3>Xác định các thực thể, thuộc tính, và mối quan hệ giữa chúng trong hệ thống.</h3><p><br></p><ul><li><strong>ERD sẽ cung cấp một cái nhìn tổng quan về cách dữ liệu được tổ chức, giúp làm cơ sở cho việc thiết kế cơ sở dữ liệu. Mục tiêu chính là tạo một mô hình logic rõ ràng, trực quan, và phù hợp với các yêu cầu nghiệp vụ.</strong></li></ul>',NULL,'46','2025-05-28 08:30:17','2025-05-29 08:45:00',NULL,'false'),(190,66,'Tìm hiểu các tính năng cần có','<p>Thu thập và phân tích các tính năng quan trọng cần có cho hệ thống quản lý công việc. </p><p><br></p><p>Mục tiêu là đảm bảo hệ thống đáp ứng đầy đủ nhu cầu của người dùng, từ quản lý không gian làm việc đến các tác vụ chi tiết trong từng thẻ.</p>',NULL,NULL,'2025-05-28 08:21:40','2025-05-28 08:30:00',NULL,'false'),(191,67,'Tạo lược đồ quan hệ cho các thực thể',NULL,NULL,NULL,NULL,NULL,NULL,'false'),(192,67,'Xác định các bảng hỗ trợ',NULL,NULL,NULL,NULL,NULL,NULL,'false'),(193,67,'Chuẩn hóa dữ liệu để đảm bảo tính toàn vẹn',NULL,NULL,NULL,NULL,NULL,NULL,'false'),(194,68,'Triển khai cơ sở dữ liệu',NULL,NULL,NULL,NULL,NULL,NULL,'false'),(195,68,'Tạo bảng trên MySQL',NULL,NULL,NULL,NULL,NULL,NULL,'false'),(196,68,'Thêm các ràng buộc khóa chính, khóa ngoại.',NULL,NULL,NULL,NULL,NULL,NULL,'false'),(197,68,'Nhập dữ liệu mẫu cho từng bảng',NULL,NULL,'46','2025-05-25 00:00:00','2025-05-31 17:00:00',NULL,'false'),(203,71,'Nghiên cứu thị trường','<p>Thu thập thông tin từ khách hàng và đối thủ cạnh tranh để tìm ra các xu hướng mới.</p>',NULL,NULL,NULL,NULL,NULL,'false'),(204,71,'Đề xuất tính năng sản phẩm mới','<p>Tổng hợp các ý tưởng sáng tạo dựa trên nhu cầu thị trường.</p>',NULL,NULL,NULL,NULL,NULL,'false'),(205,72,'Lập kế hoạch sản xuất','<p>Xác định thời gian, ngân sách và tài nguyên cần thiết cho sản xuất.</p>',NULL,NULL,NULL,NULL,NULL,'false'),(206,72,'Tạo mẫu sản phẩm','<p>Thiết kế và sản xuất mẫu thử để kiểm tra chất lượng</p>',NULL,NULL,NULL,NULL,NULL,'false'),(207,73,'Xây dựng kế hoạch quảng cáo',NULL,NULL,NULL,NULL,NULL,NULL,'false'),(208,74,'Tính toán chi phí sản xuất','<p>Dự toán các chi phí liên quan đến sản xuất sản phẩm.</p>',NULL,NULL,NULL,NULL,NULL,'false'),(209,75,'Dự báo doanh thu','<p>Dự báo doanh thu trong năm dựa trên dữ liệu lịch sử và chiến lược mới.</p>',NULL,NULL,NULL,NULL,NULL,'false'),(211,76,'Ôn tập từ vựng đã học','<p>Kiểm tra và ghi nhớ từ vựng đã học trong tuần qua.</p>',NULL,NULL,NULL,NULL,NULL,'false'),(212,77,'Học thì Hiện tại đơn và Hiện tại tiếp diễn','<p>Hiểu và sử dụng đúng thì Hiện tại đơn và Hiện tại tiếp diễn.</p>',NULL,NULL,NULL,NULL,NULL,'false'),(213,77,'Thực hành câu bị động','<p>Học cách chuyển đổi câu chủ động sang câu bị động.</p>',NULL,NULL,NULL,NULL,NULL,'false'),(214,78,'Nghe bài hội thoại hàng ngày',NULL,NULL,'',NULL,NULL,NULL,'false');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_card_insert` AFTER INSERT ON `card` FOR EACH ROW begin
    update `column`
    set card_id_order = 
        if(
            card_id_order is null or card_id_order = '',
            cast(new.card_id as char),
            concat(card_id_order, ',', cast(new.card_id as char))
        )
    where column_id = new.column_id;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_card_update` AFTER UPDATE ON `card` FOR EACH ROW begin
	declare updated_card_id_order_old longtext;
    
    -- Kiểm tra id có khác nhau không
    if old.column_id != new.column_id then
    
        -- Xóa card_id khỏi board cũ
        set updated_card_id_order_old = replace(
            CONCAT(',', (select card_id_order from `column` where column_id = old.column_id), ','),
            CONCAT(',', CAST(old.card_id as char), ','),
            ','
        );

        -- Xóa dấu , thừa ở 2 đầu
        set updated_card_id_order_old = TRIM(both ',' from updated_card_id_order_old);

		-- Cập nhật card_id_order ở bảng cũ
        update `column`
        set card_id_order = updated_card_id_order_old
        where column_id = old.column_id;

		-- Cập nhật column_id_order ở bảng mới
		update `column`
		set card_id_order = 
			if(
				card_id_order is null or card_id_order = '',
				cast(new.card_id as char),
				concat(card_id_order, ',', cast(new.card_id as char))
			)
		where column_id = new.column_id;
    end if;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_card_delete` AFTER DELETE ON `card` FOR EACH ROW begin
    declare updated_card_id_order longtext;

    set updated_card_id_order = replace(
        concat(',', (select card_id_order from `column` where column_id = old.column_id), ','),
        concat(',', cast(old.card_id as char), ','),
        ','
    );

    set updated_card_id_order = trim(both ',' from updated_card_id_order);
    
    update `column`
    set card_id_order = updated_card_id_order
    where column_id = old.column_id;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `checklist`
--

DROP TABLE IF EXISTS `checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checklist` (
  `checklist_id` int NOT NULL AUTO_INCREMENT,
  `checklistname_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `timer` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`checklist_id`),
  KEY `checklistname_id` (`checklistname_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `checklist_ibfk_1` FOREIGN KEY (`checklistname_id`) REFERENCES `checklistname` (`checklistname_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `checklist_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklist`
--

LOCK TABLES `checklist` WRITE;
/*!40000 ALTER TABLE `checklist` DISABLE KEYS */;
INSERT INTO `checklist` VALUES (85,38,NULL,'Tìm hiểu cách hoạt động của các hệ thống tương tự',NULL,'true'),(86,38,NULL,'Phân tích các tính năng cốt lõi',NULL,'true'),(88,39,NULL,'Tạo sơ đồ mô tả mối quan hệ giữa các bảng',NULL,'true'),(90,39,NULL,'Xác định các hành động người dùng',NULL,'false'),(91,40,NULL,'Xác định các vai trò có trong hệ thống (Chủ sở hữu, Thành viên, Khách, Quản trị viên).',NULL,'false'),(92,40,NULL,'Xác định các quyền tương ứng với từng vai trò',NULL,'false'),(93,42,NULL,'Xác định các chức năng chính của website quản lý công việc',NULL,'false'),(94,42,NULL,'Xác định các thực thể chính',NULL,'false'),(95,42,NULL,'Xác định các mối quan hệ',NULL,'false'),(96,43,NULL,'Tìm hiểu các tính năng từ các hệ thống quản lý công việc phổ biến như Trello, Asana, ClickUp.',NULL,'false'),(97,43,NULL,'Xác định các tính năng ưu việt mà hệ thống của bạn có thể cải tiến hoặc tối ưu hóa.',NULL,'false'),(98,44,NULL,'Quản lý không gian làm việc: Tạo, chỉnh sửa, và xóa không gian làm việc.',NULL,'false'),(99,44,NULL,'Quản lý bảng: Thêm bảng, sắp xếp, và chia sẻ bảng.',NULL,'false'),(100,44,NULL,'Quản lý danh sách: Thêm, chỉnh sửa, và xóa danh sách công việc.',NULL,'false'),(101,44,NULL,'Quản lý thẻ: Gán người dùng, đặt thời hạn, và thêm mô tả.',NULL,'false'),(102,44,NULL,'Thông báo: Gửi thông báo khi có công việc đến hạn.',NULL,'false'),(103,44,NULL,'Báo cáo: Xem báo cáo tiến độ và tình hình công việc.',NULL,'false'),(104,45,NULL,'Khảo sát nhu cầu khách hàng.',NULL,'false'),(105,45,NULL,'Phân tích báo cáo ngành.',NULL,'false'),(106,45,NULL,'Tìm hiểu sản phẩm của đối thủ.',NULL,'false'),(107,46,NULL,'Viết danh sách tính năng tiềm năng.',NULL,'false'),(108,46,NULL,'Đánh giá khả năng thực hiện.',NULL,'false'),(109,47,NULL,'Lập dự toán ngân sách.',NULL,'false'),(110,47,NULL,'Xác định nhà cung cấp nguyên liệu.',NULL,'false'),(111,47,NULL,'Đặt thời gian sản xuất thử nghiệm.',NULL,'false'),(112,48,NULL,'Thiết kế bản vẽ kỹ thuật.',NULL,'false'),(113,48,NULL,'Đặt hàng vật liệu cần thiết.',NULL,'false'),(114,48,NULL,'Kiểm tra chất lượng mẫu sản phẩm.',NULL,'false'),(115,49,NULL,'Phân tích kênh quảng cáo hiệu quả.',NULL,'false'),(116,49,NULL,'Lên ngân sách quảng cáo.',NULL,'false'),(117,49,NULL,'Viết nội dung quảng cáo.',NULL,'false'),(118,50,NULL,'Tính chi phí nguyên vật liệu.',NULL,'false'),(119,50,NULL,'Ước tính chi phí nhân công.',NULL,'false'),(120,50,NULL,'Phân tích các chi phí phát sinh.',NULL,'false'),(121,51,NULL,'Thu thập dữ liệu bán hàng năm trước.',NULL,'false'),(122,51,NULL,'Phân tích các yếu tố tăng trưởng tiềm năng.',NULL,'false'),(123,51,NULL,'Lập báo cáo dự đoán doanh thu.',NULL,'false'),(127,53,NULL,'Viết lại từ và nghĩa 3 lần.',NULL,'false'),(128,53,NULL,'Sử dụng từ trong câu hoàn chỉnh.',NULL,'false'),(129,53,NULL,'Làm bài kiểm tra nhanh.',NULL,'false'),(130,55,NULL,'Xem video bài giảng về thì Hiện tại.',NULL,'false'),(131,55,NULL,'Làm bài tập phân biệt thì.',NULL,'false'),(132,55,NULL,'Viết đoạn văn ngắn sử dụng cả hai thì.',NULL,'false'),(133,56,NULL,'Xem lại cấu trúc câu bị động.',NULL,'false'),(134,56,NULL,'Làm bài tập chuyển đổi câu.',NULL,'false'),(135,56,NULL,'Kiểm tra bài.',NULL,'false');
/*!40000 ALTER TABLE `checklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checklistname`
--

DROP TABLE IF EXISTS `checklistname`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checklistname` (
  `checklistname_id` int NOT NULL AUTO_INCREMENT,
  `card_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`checklistname_id`),
  KEY `card_id` (`card_id`),
  CONSTRAINT `checklistname_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklistname`
--

LOCK TABLES `checklistname` WRITE;
/*!40000 ALTER TABLE `checklistname` DISABLE KEYS */;
INSERT INTO `checklistname` VALUES (38,187,'Nghiên cứu và phân tích yêu cầu'),(39,187,'Xây dựng sơ đồ chức năng'),(40,188,'Phân tích yêu cầu về vai trò và quyền'),(42,189,'Thu thập yêu cầu nghiệp vụ'),(43,190,'Nghiên cứu các hệ thống tương tự'),(44,190,'Xây dựng danh sách tính năng chính'),(45,203,'Công việc cần làm'),(46,204,'Công việc cần làm'),(47,205,'Công việc cần làm'),(48,206,'Việc cần làm'),(49,207,'Công việc cần làm'),(50,208,'Công việc cần làm'),(51,209,'Việc cần làm'),(53,211,'Công việc cần thực hiện'),(55,212,'Công việc cần thực hiện'),(56,213,'Công việc cần làm');
/*!40000 ALTER TABLE `checklistname` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `column`
--

DROP TABLE IF EXISTS `column`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `column` (
  `column_id` int NOT NULL AUTO_INCREMENT,
  `board_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `background` longtext,
  `card_id_order` longtext,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`column_id`),
  KEY `board_id` (`board_id`),
  CONSTRAINT `column_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `column`
--

LOCK TABLES `column` WRITE;
/*!40000 ALTER TABLE `column` DISABLE KEYS */;
INSERT INTO `column` VALUES (66,67,'Phân tích yêu cầu',NULL,'187,188,189,190','public'),(67,67,'Thiết kế cơ sở dữ liệu',NULL,'191,192,193','public'),(68,67,'Triển khai CSDL',NULL,'194,195,196,197','public'),(71,70,'Ý tưởng sản phẩm',NULL,'203,204','public'),(72,70,'Kế hoạch phát triển',NULL,'205,206','public'),(73,70,'Chiến lược tiếp thị',NULL,'207','public'),(74,73,'Dự toán chi phí',NULL,'208','public'),(75,73,'Dự báo doanh thu',NULL,'209,209','public'),(76,76,'Từ vựng',NULL,'211','public'),(77,76,'Ngữ pháp',NULL,'212,213','public'),(78,76,'Luyện nghe',NULL,'214','public');
/*!40000 ALTER TABLE `column` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_column_insert` AFTER INSERT ON `column` FOR EACH ROW begin
    update `board`
    set column_id_order = 
        if(
            column_id_order is null or column_id_order = '',
            cast(new.column_id as char),
            concat(column_id_order, ',', cast(new.column_id as char))
        )
    where board_id = new.board_id;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_column_update` AFTER UPDATE ON `column` FOR EACH ROW begin
	declare updated_column_id_order_old longtext;
    
    -- Kiểm tra id có khác nhau không
    if old.board_id != new.board_id then
    
        -- Xóa column_id khỏi board cũ
        set updated_column_id_order_old = replace(
            CONCAT(',', (select column_id_order from `board` where board_id = old.board_id), ','),
            CONCAT(',', CAST(old.column_id as char), ','),
            ','
        );

        -- Xóa dấu , thừa ở 2 đầu
        set updated_column_id_order_old = TRIM(both ',' from updated_column_id_order_old);

		-- Cập nhật column_id_order ở bảng cũ
        update `board`
        set column_id_order = updated_column_id_order_old
        where board_id = old.board_id;

		-- Cập nhật column_id_order ở bảng mới
		update `board`
		set column_id_order = 
			if(
				column_id_order is null or column_id_order = '',
				cast(new.column_id as char),
				concat(column_id_order, ',', cast(new.column_id as char))
			)
		where board_id = new.board_id;
    end if;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_column_delete` AFTER DELETE ON `column` FOR EACH ROW begin
    declare updated_column_id_order longtext;

    set updated_column_id_order = replace(
        concat(',', (select column_id_order from `board` where board_id = old.board_id), ','),
        concat(',', cast(old.column_id as char), ','),
        ','
    );

    set updated_column_id_order = trim(both ',' from updated_column_id_order);
    
    update `board`
    set column_id_order = updated_column_id_order
    where board_id = old.board_id;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `card_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment` longtext,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `card_id` (`card_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (23,187,46,'hello','2025-05-30 19:44:24');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversation`
--

DROP TABLE IF EXISTS `conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversation` (
  `conversation_id` int NOT NULL AUTO_INCREMENT,
  `user_id_1` int NOT NULL,
  `user_id_2` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`conversation_id`),
  KEY `user_id_1` (`user_id_1`),
  KEY `user_id_2` (`user_id_2`),
  CONSTRAINT `conversation_ibfk_1` FOREIGN KEY (`user_id_1`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `conversation_ibfk_2` FOREIGN KEY (`user_id_2`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation`
--

LOCK TABLES `conversation` WRITE;
/*!40000 ALTER TABLE `conversation` DISABLE KEYS */;
INSERT INTO `conversation` VALUES (55,46,45,'2025-05-27 00:00:00'),(56,46,44,'2025-05-30 00:00:00'),(57,46,43,'2025-05-30 00:00:00');
/*!40000 ALTER TABLE `conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `file_id` int NOT NULL AUTO_INCREMENT,
  `card_id` int NOT NULL,
  `user_id` int NOT NULL,
  `path` longtext,
  PRIMARY KEY (`file_id`),
  KEY `card_id` (`card_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `file_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest`
--

DROP TABLE IF EXISTS `guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest` (
  `board_id` int NOT NULL,
  `user_id` int NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `permission` longtext,
  PRIMARY KEY (`board_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `guest_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `guest_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest`
--

LOCK TABLES `guest` WRITE;
/*!40000 ALTER TABLE `guest` DISABLE KEYS */;
INSERT INTO `guest` VALUES (67,45,'guest',NULL),(67,46,'own',NULL),(68,46,'own',NULL),(69,46,'own',NULL),(70,45,'own',NULL),(70,46,'guest',NULL),(72,46,'guest',NULL),(73,45,'guest',NULL),(73,46,'own',NULL),(74,46,'own',NULL),(76,46,'own',NULL);
/*!40000 ALTER TABLE `guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `label`
--

DROP TABLE IF EXISTS `label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `label` (
  `label_id` int NOT NULL AUTO_INCREMENT,
  `labelboard_id` int NOT NULL,
  `card_id` int NOT NULL,
  PRIMARY KEY (`label_id`),
  KEY `labelboard_id` (`labelboard_id`),
  KEY `card_id` (`card_id`),
  CONSTRAINT `label_ibfk_1` FOREIGN KEY (`labelboard_id`) REFERENCES `labelboard` (`labelboard_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `label_ibfk_2` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `label`
--

LOCK TABLES `label` WRITE;
/*!40000 ALTER TABLE `label` DISABLE KEYS */;
INSERT INTO `label` VALUES (113,59,187),(115,60,187);
/*!40000 ALTER TABLE `label` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labelboard`
--

DROP TABLE IF EXISTS `labelboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labelboard` (
  `labelboard_id` int NOT NULL AUTO_INCREMENT,
  `board_id` int NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `background` longtext,
  PRIMARY KEY (`labelboard_id`),
  KEY `board_id` (`board_id`),
  CONSTRAINT `labelboard_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labelboard`
--

LOCK TABLES `labelboard` WRITE;
/*!40000 ALTER TABLE `labelboard` DISABLE KEYS */;
INSERT INTO `labelboard` VALUES (59,67,'Hoàn thành','#4bce97'),(60,67,'Cảnh báo','#f5cd47'),(61,67,'Lỗi','#FF5252'),(62,67,'','#6e5dc6'),(63,67,'','#0055cc'),(64,68,'','#4bce97'),(65,68,'','#f5cd47'),(66,68,'','#dfd8fd'),(67,68,'','#6e5dc6'),(68,68,'','#0055cc'),(69,69,'','#4bce97'),(70,69,'','#f5cd47'),(71,69,'','#dfd8fd'),(72,69,'','#6e5dc6'),(73,69,'','#0055cc'),(74,70,'','#4bce97'),(75,70,'','#f5cd47'),(76,70,'','#dfd8fd'),(77,70,'','#6e5dc6'),(78,70,'','#0055cc'),(84,72,'','#4bce97'),(85,72,'','#f5cd47'),(86,72,'','#dfd8fd'),(87,72,'','#6e5dc6'),(88,72,'','#0055cc'),(89,73,'','#4bce97'),(90,73,'','#f5cd47'),(91,73,'','#dfd8fd'),(92,73,'','#6e5dc6'),(93,73,'','#0055cc'),(94,74,'','#4bce97'),(95,74,'','#f5cd47'),(96,74,'','#dfd8fd'),(97,74,'','#6e5dc6'),(98,74,'','#0055cc'),(104,76,'','#4bce97'),(105,76,'','#f5cd47'),(106,76,'','#dfd8fd'),(107,76,'','#6e5dc6'),(108,76,'','#0055cc');
/*!40000 ALTER TABLE `labelboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `workspace_id` int NOT NULL,
  `user_id` int NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`workspace_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`workspace_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `member_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (97,46,'own'),(98,45,'member'),(98,46,'own'),(101,46,'own');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `conversation_id` int NOT NULL,
  `sender_id` int NOT NULL,
  `message` longtext,
  `status` bit(1) DEFAULT b'0',
  `created_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `sender_id` (`sender_id`),
  KEY `conversation_id` (`conversation_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`conversation_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=442 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (308,55,45,'hú',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(309,55,46,'nghe',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(310,55,45,':)))))))',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(311,55,46,'méo hiểu',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(312,55,45,'chịu',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(313,55,46,'lúc được lúc không',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(314,55,46,'được chưa',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(315,55,45,'chắc là ok r',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(316,55,46,':))))))))',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(317,55,45,'avatart đâu',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(318,55,46,'chịu luôn mà',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(319,55,45,'khó luôn',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(320,55,46,'lú luôn mà',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(321,55,46,'chịu',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(322,55,45,'j đây',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(323,55,46,'méo biết',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(324,55,45,'lú v ò',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(325,55,46,'hahahahaha',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(326,55,46,'đau đầu luôn đấy',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(327,55,46,'ai mà biết được',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(328,55,46,'như nhái',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(329,55,45,'đúng z',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(330,55,45,'chịu đấy',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(331,55,46,'r s',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(332,55,45,'ai biết',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(333,55,45,'như',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(334,55,46,'như nhái',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(335,55,45,'ok',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(336,55,45,'ok nè',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(337,55,46,'ok',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(338,55,45,'ok r đấy',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(339,55,46,'t chịu',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(340,55,45,'như nhái',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(341,55,45,'alo',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(342,55,46,'alo',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(343,55,45,'???',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(344,55,45,'không hiểu',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(345,55,46,'s nhắn được mỗi bên vậy',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(346,55,46,'khó hiểu',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(347,55,45,'uk',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(348,55,46,'?',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(349,55,45,'?',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(350,55,46,'lú v ò',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(351,55,45,'méo hiểu luôn',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(352,55,46,'alo',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(353,55,45,'ơi',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(354,55,46,'ok',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(355,55,46,'hú',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(356,55,45,'ới',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(357,55,46,'lỗi ngay',_binary '\0','2025-05-27 00:00:00','2025-05-27 00:00:00'),(358,55,45,'alo',_binary '\0','2025-05-28 00:00:00','2025-05-28 00:00:00'),(359,55,46,'ơi',_binary '\0','2025-05-28 00:00:00','2025-05-28 00:00:00'),(360,55,45,'hú',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(361,55,46,'ơi',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(362,55,45,'???',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(363,55,45,'lỗi rồi',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(364,55,46,'khó hiểu',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(365,55,46,'đau đầu',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(366,55,45,'chịu luôn mà',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(367,55,46,'ủa s k gửi được',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(368,55,45,'được đây còn gì',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(369,55,45,'alo',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(370,55,46,'hú',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(371,55,45,'ơi',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(372,55,46,'nghe k',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(373,55,45,'có',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(374,55,45,'gà',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(375,55,46,'là sao',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(376,55,46,'không hiểu luôn mà',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(377,55,45,'s k được r',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(378,55,46,'vẫn nhận được đây',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(379,55,46,'chịu',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(380,55,45,'lú luôn',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(381,55,46,'là s',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(382,55,45,'khó hiểu',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(383,55,46,'lúc được lúc không vậy',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(384,55,45,'ai biết',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(385,55,45,'alo',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(386,55,46,'nghe',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(387,55,45,'ok',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(388,55,46,'đã nhận được tin nhắn',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(389,55,46,'có j không',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(390,55,45,'k chỉ là muốn test xem chức năng nhắn tin có hoạt động ok k hay thôi',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(391,55,46,'ok r',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(392,55,46,'thử load lại xem',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(393,55,45,'ok',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(394,55,45,'đã load lại rồi',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(395,55,45,'nhắn tin có nhận được không',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(396,55,46,'bên này nhận được',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(397,55,46,'bên đó thì s',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(398,55,45,'vẫn nhận được nhe',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(399,55,45,'thế là s nhỉ',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(400,55,46,'chịu thôi',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(401,55,45,'khó hiểu luôn',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(402,55,46,'nhận được k',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(403,55,45,'vẫn được',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(404,55,45,'bên đó thì s',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(405,55,46,'k được r',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(406,55,46,'chịu',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(407,55,45,'chịu',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(408,55,46,'chịu luôn',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(409,55,45,'chịu thật',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(410,55,45,'alo',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(411,55,46,'nghe',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(412,55,45,'ok 1 nè',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(413,55,46,'load lại thử xem',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(414,55,45,'bên này đã load',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(415,55,45,'load bên này thì chắc bên đấy vẫn nhận được',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(416,55,45,'bh test bên đấy nhắn qua bên này thử xem',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(417,55,46,'ok',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(418,55,46,'bên này nhắn qua rồi đó',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(419,55,46,'https://meet.google.com/ake-bwqm-job',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(420,55,46,'ok chưa',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(421,55,45,'ok rồi đấy',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(422,55,45,'alo',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(423,55,46,'ơi',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(424,55,45,'nghe k',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(425,55,46,'nghe',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(426,55,45,'nhận đc k',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(427,55,46,'đc',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(428,55,45,'bên này cx được',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(429,55,46,'load bên này nhé',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(430,55,46,'bên này đã load',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(431,55,45,'bên này vẫn nhận được',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(432,55,46,'bên này cũng thế',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(433,55,45,'ngon ngay',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(434,55,46,'ok luôn',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(435,55,46,'ae mk cứ thế thôi hẹ hẹ????',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(436,55,45,'hahahahaha',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(437,55,45,'alo',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(438,55,46,'nghền ní ơi',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(439,55,45,'ơi',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(440,55,46,'nghe ní',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00'),(441,55,45,'hahahahaha',_binary '\0','2025-05-30 00:00:00','2025-05-30 00:00:00');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `card_id` int DEFAULT NULL,
  `checklist_id` int DEFAULT NULL,
  `message` longtext,
  `is_sent` tinyint(1) DEFAULT '0',
  `is_read` tinyint(1) DEFAULT '0',
  `notify_time` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`notification_id`),
  KEY `card_id` (`card_id`),
  KEY `user_id` (`user_id`),
  KEY `checklist_id` (`checklist_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notification_ibfk_3` FOREIGN KEY (`checklist_id`) REFERENCES `checklist` (`checklist_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=381 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (351,46,187,NULL,'Đồ án tốt nghiệp,97,Thiết kế CSDL,67 Thẻ \"Thu thập yêu cầu về quản lý không gian làm việc, bảng, danh sách, thẻ.\" sẽ hết hạn vào 2025-03-30 00:00:00',1,1,'2025-03-30 00:00:00','2025-05-26 18:14:04','2025-05-26 18:14:07'),(352,46,197,NULL,'Đồ án tốt nghiệp,97,Thiết kế CSDL,67 Thẻ \"Nhập dữ liệu mẫu cho từng bảng\" sẽ hết hạn vào 2025-05-26 21:06:00',1,1,'2025-05-26 21:06:00','2025-05-26 18:14:04','2025-05-26 18:14:07'),(354,45,NULL,NULL,'Hiệp Vũ đã mời bạn tham gia vào cuộc họp được diễn ra từ 2025-05-27T01:14 đến 2025-05-27T02:14 link: https://meet.google.com/boj-fcvq-orz',1,1,'2025-05-27 01:14:33','2025-05-26 18:14:33','2025-05-26 18:15:17'),(355,45,NULL,NULL,'/,97,Thiết kế CSDL,67 Hiệp Vũ đã thêm bạn vào bảng Thiết kế CSDL là thành viên',1,1,'2025-05-27 01:15:29','2025-05-26 18:15:29','2025-05-26 18:18:33'),(356,45,NULL,NULL,'Đồ án tốt nghiệp,97,/,0 Hiệp Vũ đã thêm bạn vào không gian làm việc Đồ án tốt nghiệp với tư cách là thành viên',1,1,'2025-05-27 01:17:12','2025-05-26 18:17:12','2025-05-26 18:18:33'),(357,46,NULL,NULL,'Vũ Minh Hiếu đã mời bạn tham gia vào cuộc họp được diễn ra từ 2025-05-27T01:17 đến 2025-05-27T02:17 link: https://meet.google.com/oew-skom-vur',1,1,'2025-05-27 01:18:10','2025-05-26 18:18:10','2025-05-26 18:18:22'),(359,45,NULL,NULL,'/,97,Thiết kế giao diện,69 Hiệp Vũ đã thêm bạn vào bảng Thiết kế giao diện là thành viên',1,1,'2025-05-27 01:23:29','2025-05-26 18:23:29','2025-05-26 18:23:32'),(360,45,NULL,NULL,'Test không gian làm việc,98,/,0 Hiệp Vũ đã thêm bạn vào không gian làm việc Test không gian làm việc với tư cách là thành viên',1,1,'2025-05-27 01:23:45','2025-05-26 18:23:45','2025-05-26 18:24:08'),(361,45,NULL,NULL,'Hiệp Vũ đã mời bạn tham gia vào cuộc họp được diễn ra từ 2025-05-27T01:23 đến 2025-05-27T02:23 link: https://meet.google.com/jzt-rkug-vbz',1,1,'2025-05-27 01:24:04','2025-05-26 18:24:04','2025-05-26 18:24:08'),(362,46,NULL,NULL,'Test để đổi,99,/,0 Vũ Minh Hiếu đã thêm bạn vào không gian làm việc Test để đổi với tư cách là thành viên',1,1,'2025-05-27 08:54:37','2025-05-27 01:54:37','2025-05-27 01:57:43'),(363,45,NULL,NULL,'Test không gian làm việc,98,/,0 Hiệp Vũ đã thêm bạn vào không gian làm việc Test không gian làm việc với tư cách là thành viên',1,1,'2025-05-27 08:54:54','2025-05-27 01:54:54','2025-05-27 01:54:57'),(364,45,NULL,NULL,'Test,100,/,0 Hiệp Vũ đã thêm bạn vào không gian làm việc Test với tư cách là thành viên',1,1,'2025-05-27 09:03:18','2025-05-27 02:03:18','2025-05-27 02:04:07'),(365,46,NULL,NULL,'/,98,test thông báo,70 Vũ Minh Hiếu đã thêm bạn vào bảng test thông báo là thành viên',1,1,'2025-05-27 09:04:00','2025-05-27 02:04:00','2025-05-27 02:04:03'),(366,45,NULL,NULL,'Hiệp Vũ đã mời bạn tham gia vào cuộc họp được diễn ra từ 2025-05-27T09:04 đến 2025-05-27T10:04 link: https://meet.google.com/mdr-pgxt-zvz',1,1,'2025-05-27 09:05:12','2025-05-27 02:05:12','2025-05-27 02:05:15'),(367,45,NULL,NULL,'/,98,Kế hoạch tài chính,73 Hiệp Vũ đã thêm bạn vào bảng Kế hoạch tài chính là thành viên',1,1,'2025-05-27 16:56:33','2025-05-27 09:56:33','2025-05-27 09:56:56'),(368,45,NULL,NULL,'/,98,Kế hoạch tài chính,73 Hiệp Vũ đã thêm bạn vào bảng Kế hoạch tài chính là thành viên',1,1,'2025-05-27 16:56:53','2025-05-27 09:56:53','2025-05-27 09:56:56'),(369,45,NULL,NULL,'/,98,Phát triển đội ngũ kinh doanh,74 Hiệp Vũ đã thêm bạn vào bảng Phát triển đội ngũ kinh doanh là thành viên',1,1,'2025-05-27 19:37:38','2025-05-27 12:37:38','2025-05-27 12:37:40'),(370,45,NULL,NULL,'/,98,Kế hoạch tài chính,73 Hiệp Vũ đã thêm bạn vào bảng Kế hoạch tài chính là thành viên',1,1,'2025-05-27 19:39:03','2025-05-27 12:39:03','2025-05-27 12:39:06'),(371,46,NULL,NULL,'/,100,Test,75 Vũ Minh Hiếu đã thêm bạn vào bảng Test là thành viên',1,1,'2025-05-27 19:40:09','2025-05-27 12:40:09','2025-05-27 12:40:11'),(372,46,188,NULL,'Đồ án tốt nghiệp,97,Thiết kế CSDL,67 Thẻ \"Xác định các mối quan hệ giữa người dùng, vai trò, và quyền truy cập.\" sẽ hết hạn vào 2025-05-28 08:21:00',1,1,'2025-05-28 08:21:00','2025-05-28 01:20:04','2025-05-30 07:36:25'),(373,46,190,NULL,'Đồ án tốt nghiệp,97,Thiết kế CSDL,67 Thẻ \"Tìm hiểu các tính năng cần có\" sẽ hết hạn vào 2025-05-28 08:30:00',1,1,'2025-05-28 08:30:00','2025-05-28 01:25:04','2025-05-30 07:36:25'),(374,45,NULL,NULL,'/,97,Thiết kế CSDL,67 Hiệp Vũ đã thêm bạn vào bảng Thiết kế CSDL là thành viên',1,1,'2025-05-28 08:45:19','2025-05-28 01:45:19','2025-05-30 12:23:45'),(375,46,189,NULL,'Đồ án tốt nghiệp,97,Thiết kế CSDL,67 Thẻ \"Xây dựng mô hình thực thể - liên kết (ERD)\" sẽ hết hạn vào 2025-05-29 08:45:00',1,1,'2025-05-29 08:45:00','2025-05-29 08:47:04','2025-05-30 07:36:25'),(376,45,NULL,NULL,'/,97,Xây dựng API,68 Hiệp Vũ đã thêm bạn vào bảng Xây dựng API là thành viên',1,1,'2025-05-30 19:43:10','2025-05-30 12:43:10','2025-05-30 12:43:13'),(377,45,NULL,NULL,'/,97,Báo cáo,72 Hiệp Vũ đã thêm bạn vào bảng Báo cáo là thành viên',1,1,'2025-05-30 20:13:04','2025-05-30 13:13:04','2025-05-30 13:13:06'),(378,45,NULL,NULL,'/,97,Thiết kế CSDL,67 Hiệp Vũ đã thêm bạn vào bảng Thiết kế CSDL là thành viên',1,1,'2025-05-30 20:13:34','2025-05-30 13:13:34','2025-05-30 13:13:40'),(379,45,NULL,NULL,'/,97,Thiết kế CSDL,67 Hiệp Vũ đã thêm bạn vào bảng Thiết kế CSDL là thành viên',1,1,'2025-05-30 20:23:21','2025-05-30 13:23:21','2025-05-30 13:23:30'),(380,45,NULL,NULL,'/,101,Học tiếng Anh,76 Hiệp Vũ đã thêm bạn vào bảng Học tiếng Anh là thành viên',1,1,'2025-05-30 23:12:11','2025-05-30 16:12:11','2025-05-30 16:12:15');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settingboard`
--

DROP TABLE IF EXISTS `settingboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settingboard` (
  `settingboard_id` int NOT NULL AUTO_INCREMENT,
  `board_id` int NOT NULL,
  `action` varchar(250) DEFAULT NULL,
  `permission` longtext,
  PRIMARY KEY (`settingboard_id`),
  KEY `board_id` (`board_id`),
  CONSTRAINT `settingboard_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settingboard`
--

LOCK TABLES `settingboard` WRITE;
/*!40000 ALTER TABLE `settingboard` DISABLE KEYS */;
INSERT INTO `settingboard` VALUES (56,67,'guest','just admin'),(57,67,'create','just admin'),(58,67,'delete','all guest'),(59,67,'comment','just admin'),(60,67,'move','just admin'),(61,68,'guest','just admin'),(62,68,'create','all guest'),(63,68,'delete','all guest'),(64,68,'comment','all guest'),(65,68,'move','all guest'),(66,69,'guest','all guest'),(67,69,'create','all guest'),(68,69,'delete','all guest'),(69,69,'comment','all guest'),(70,69,'move','all guest'),(71,70,'guest','all guest'),(72,70,'create','all guest'),(73,70,'delete','all guest'),(74,70,'comment','all guest'),(75,70,'move','all guest'),(81,72,'guest','all guest'),(82,72,'create','just admin'),(83,72,'delete','just admin'),(84,72,'comment','just admin'),(85,72,'move','just admin'),(86,73,'guest','all guest'),(87,73,'create','all guest'),(88,73,'delete','all guest'),(89,73,'comment','all guest'),(90,73,'move','all guest'),(91,74,'guest','all guest'),(92,74,'create','all guest'),(93,74,'delete','all guest'),(94,74,'comment','all guest'),(95,74,'move','all guest'),(101,76,'guest','all guest'),(102,76,'create','all guest'),(103,76,'delete','all guest'),(104,76,'comment','all guest'),(105,76,'move','all guest');
/*!40000 ALTER TABLE `settingboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settingcard`
--

DROP TABLE IF EXISTS `settingcard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settingcard` (
  `settingcard_id` int NOT NULL AUTO_INCREMENT,
  `card_id` int NOT NULL,
  `action` varchar(250) DEFAULT NULL,
  `permission` longtext,
  PRIMARY KEY (`settingcard_id`),
  KEY `card_id` (`card_id`),
  CONSTRAINT `settingcard_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settingcard`
--

LOCK TABLES `settingcard` WRITE;
/*!40000 ALTER TABLE `settingcard` DISABLE KEYS */;
INSERT INTO `settingcard` VALUES (106,187,'invite','just admin'),(107,187,'checklist','just admin'),(108,187,'handle','just admin'),(109,188,'invite','all guest'),(110,188,'checklist','all guest'),(111,188,'handle','all guest'),(112,189,'invite','all guest'),(113,189,'checklist','all guest'),(114,189,'handle','all guest'),(115,190,'invite','all guest'),(116,190,'checklist','all guest'),(117,190,'handle','all guest'),(118,191,'invite','all guest'),(119,191,'checklist','all guest'),(120,191,'handle','all guest'),(121,192,'invite','all guest'),(122,192,'checklist','all guest'),(123,192,'handle','all guest'),(124,193,'invite','all guest'),(125,193,'checklist','all guest'),(126,193,'handle','all guest'),(127,194,'invite','all guest'),(128,194,'checklist','all guest'),(129,194,'handle','all guest'),(130,195,'invite','all guest'),(131,195,'checklist','all guest'),(132,195,'handle','all guest'),(133,196,'invite','all guest'),(134,196,'checklist','all guest'),(135,196,'handle','all guest'),(136,197,'invite','all guest'),(137,197,'checklist','all guest'),(138,197,'handle','all guest'),(154,203,'invite','all guest'),(155,203,'checklist','all guest'),(156,203,'handle','all guest'),(157,204,'invite','all guest'),(158,204,'checklist','all guest'),(159,204,'handle','all guest'),(160,205,'invite','all guest'),(161,205,'checklist','all guest'),(162,205,'handle','all guest'),(163,206,'invite','all guest'),(164,206,'checklist','all guest'),(165,206,'handle','all guest'),(166,207,'invite','all guest'),(167,207,'checklist','all guest'),(168,207,'handle','all guest'),(169,208,'invite','all guest'),(170,208,'checklist','all guest'),(171,208,'handle','all guest'),(172,209,'invite','all guest'),(173,209,'checklist','all guest'),(174,209,'handle','all guest'),(178,211,'invite','just admin'),(179,211,'checklist','card member'),(180,211,'handle','card member'),(181,212,'invite','all guest'),(182,212,'checklist','all guest'),(183,212,'handle','all guest'),(184,213,'invite','all guest'),(185,213,'checklist','all guest'),(186,213,'handle','all guest'),(187,214,'invite','all guest'),(188,214,'checklist','all guest'),(189,214,'handle','all guest');
/*!40000 ALTER TABLE `settingcard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settingworkspace`
--

DROP TABLE IF EXISTS `settingworkspace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settingworkspace` (
  `settingworkspace_id` int NOT NULL AUTO_INCREMENT,
  `workspace_id` int NOT NULL,
  `action` varchar(250) DEFAULT NULL,
  `permission` longtext,
  PRIMARY KEY (`settingworkspace_id`),
  KEY `workspace_id` (`workspace_id`),
  CONSTRAINT `settingworkspace_ibfk_1` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`workspace_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settingworkspace`
--

LOCK TABLES `settingworkspace` WRITE;
/*!40000 ALTER TABLE `settingworkspace` DISABLE KEYS */;
INSERT INTO `settingworkspace` VALUES (82,90,'createboard','{\"public\":\"no one\",\"private\":\"no one\",\"workspace\":\"all member\"}'),(83,90,'deleteboard','{\"public\": \"all member\", \"workspace\": \"all member\", \"private\": \"all member\"}'),(84,90,'invitemember','{\"status\":\"just admin\"}'),(94,94,'createboard','{\"public\": \"all member\", \"workspace\": \"all member\", \"private\": \"all member\"}'),(95,94,'deleteboard','{\"public\": \"all member\", \"workspace\": \"all member\", \"private\": \"all member\"}'),(96,94,'invitemember','{\"status\": \"all member\"}'),(103,97,'createboard','{\"public\": \"all member\", \"workspace\": \"all member\", \"private\": \"all member\"}'),(104,97,'deleteboard','{\"public\":\"just admin\",\"private\":\"just admin\",\"workspace\":\"just admin\"}'),(105,97,'invitemember','{\"status\":\"just admin\"}'),(106,98,'createboard','{\"public\": \"all member\", \"workspace\": \"all member\", \"private\": \"all member\"}'),(107,98,'deleteboard','{\"public\": \"all member\", \"workspace\": \"all member\", \"private\": \"all member\"}'),(108,98,'invitemember','{\"status\": \"all member\"}'),(115,101,'createboard','{\"public\": \"all member\", \"workspace\": \"all member\", \"private\": \"all member\"}'),(116,101,'deleteboard','{\"public\": \"all member\", \"workspace\": \"all member\", \"private\": \"all member\"}'),(117,101,'invitemember','{\"status\": \"all member\"}');
/*!40000 ALTER TABLE `settingworkspace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `avatar` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` varchar(50) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (42,'Admin','task.donotreply@gmail.com','$2b$10$zzG1ALyw0aUeiS6K9JPLCOib7O5ar8bB3jb4C7TOjf3KqyP3UOwOC',NULL,NULL,'https://res.cloudinary.com/dqkog9xuj/image/upload/v1747490098/uploads/avatar_trang_1_cd729c335b-422022293.png.jpg','2025-05-16 18:32:25','2025-05-26 02:58:15','admin'),(43,'MH Gaming','mhgaming035@gmail.com','',NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocLz-Q3AdllyGPRl1qAwhLwmo7u5z8V2AxBow52vY4r0NBt7=s96-c','2025-05-16 19:12:19','2025-05-16 19:12:19','user'),(44,'Gvenh CHANNEL','vuvanhiep05092003@gmail.com','',NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocK3H99X81zoBw01Fry5oP-dIaV13-mRAYwNjr-Lmys3t6kYfTer=s96-c','2025-05-23 07:46:58','2025-05-23 07:46:58','user'),(45,'Vũ Minh Hiếu','vuminhhieu21122003@gmail.com','$2b$10$aoLw6qtWvysr5r/7XC6LueOw9WA7ewOGXzKgwRAbBvGNOq6NKg/5y',NULL,NULL,'https://res.cloudinary.com/dqkog9xuj/image/upload/v1747490098/uploads/avatar_trang_1_cd729c335b-422022293.png.jpg','2025-05-23 16:17:02','2025-05-23 16:19:49','user'),(46,'Hiệp Vũ','gvenh59@gmail.com','',NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocLr08WEQzILJn0Qvaio4RwSpB6CpMnEbMFkPbCe-q-ZbnBQrQ=s96-c','2025-05-26 03:00:14','2025-05-26 03:00:14','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workspace`
--

DROP TABLE IF EXISTS `workspace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workspace` (
  `workspace_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `logo` longtext,
  `description` longtext,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`workspace_id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workspace`
--

LOCK TABLES `workspace` WRITE;
/*!40000 ALTER TABLE `workspace` DISABLE KEYS */;
INSERT INTO `workspace` VALUES (90,'Thực chiến','https://res.cloudinary.com/dqkog9xuj/image/upload/v1746518811/uploads/320748224_1223304721872606_6202089843894856175_n-544307836.jpg','Cố gắng','public'),(94,'Đồ án tốt nghiệp','https://res.cloudinary.com/dqkog9xuj/image/upload/v1747674599/uploads/scaramouche-755856249.png.jpg','','private'),(97,'Đồ án tốt nghiệp','https://res.cloudinary.com/dqkog9xuj/image/upload/v1748247704/uploads/xanh%20n%C3%86%C2%B0%C3%A1%C2%BB%C2%9Bc%20bi%C3%A1%C2%BB%C2%83n-884633694.jpg.jpg','','private'),(98,'Kế hoạch kinh doanh 2025','https://res.cloudinary.com/dqkog9xuj/image/upload/v1748337687/uploads/v%C3%83%C2%A0ng-799818168.jpg.jpg','','private'),(101,'Học tập','https://res.cloudinary.com/dqkog9xuj/image/upload/v1748350069/uploads/xanh%20%C3%84%C2%91%C3%A1%C2%BA%C2%ADm-352562201.png.jpg','','private');
/*!40000 ALTER TABLE `workspace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'datn'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `check_expiring_card` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `check_expiring_card` ON SCHEDULE EVERY 1 MINUTE STARTS '2025-05-26 21:15:04' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    INSERT INTO notification (user_id, card_id, message, notify_time) 
	SELECT 
		user_list.user_id,
		c.card_id,
		CONCAT(
			w.name, ',', w.workspace_id, ',', 
			b.name, ',', b.board_id, ' Thẻ "', 
			c.name, '" sẽ hết hạn vào ', 
			DATE_FORMAT(c.end_date, '%Y-%m-%d %H:%i:%s')
		) AS message,
		CASE 
			WHEN c.timer IS NULL THEN c.end_date
			ELSE c.timer
		END AS notify_time
	FROM 
		card c
	JOIN 
		`column` col
		ON col.column_id = c.column_id
	JOIN 
		board b
		ON b.board_id = col.board_id
	JOIN 
		workspace w
		ON w.workspace_id = b.workspace_id
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
END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'datn'
--
/*!50003 DROP PROCEDURE IF EXISTS `CreateActivityCard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateActivityUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateActivityUser`(
in p_user_id int,
in p_action VARCHAR(255),
in p_ip_address VARCHAR(45),
in p_device VARCHAR(255),
in p_browser VARCHAR(255),
in p_url VARCHAR(255),
in p_status VARCHAR(50),
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
	IF NOT EXISTS (
		SELECT 1 
		FROM activityuser 
		WHERE user_id = p_user_id 
			AND ip_address = p_ip_address
			AND device = p_device
			AND browser = p_browser
			AND DATE(created_at) = CURRENT_DATE
	) THEN 
		insert into `activityuser`(
		user_id,
		action,
		ip_address,
		device,
		browser,
		url,
		status
        )
        value(
 		p_user_id,
		p_action,
		p_ip_address,
		p_device,
		p_browser,
		p_url,
		p_status
        );
        END IF;
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateBoard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateCard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
        'false'
        );
        set p_card_id = last_insert_id();
		call CreateSettingCard(p_card_id,'invite','all guest', @err, @msg);
		call CreateSettingCard(p_card_id,'checklist','all guest', @err, @msg);		
        call CreateSettingCard(p_card_id,'handle','all guest', @err, @msg);
		select * from `card` where card_id = p_card_id;
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateCheckList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateCheckList`(
in p_checklistname_id int,
in p_name varchar(100),
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
		insert into `checklist`(
        checklistname_id,
        name,
        status
        )
        value(
        p_checklistname_id,
        p_name,
        'false'
        );
        select * from `checklist` where checklist_id = last_insert_id();
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateCheckListName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateCheckListName`(
in p_card_id int,
in p_name varchar(100),
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
		insert into `checklistname`(
        card_id,
        name
        )
        value(
        p_card_id,
        p_name
        );
        select * from `checklistname` where checklistname_id = last_insert_id();
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateColumn` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateColumn`(
in p_board_id varchar(100),
in p_name varchar(100),
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
		insert into `column`(
        board_id,
        name,
        status
        )
        value(
		p_board_id,
        p_name,
        p_status
        );
        select * from `column` where column_id = last_insert_id();
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateComment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateConversation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateConversation`(
in p_user_id_1 int,
in p_user_id_2 int,
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
    if not exists (select * from `conversation` c where (c.user_id_1 = p_user_id_1 and c.user_id_2 = p_user_id_2) or (c.user_id_1 = p_user_id_2 and c.user_id_2 = p_user_id_1))
    then
		insert into `conversation`(
        user_id_1,
        user_id_2,
        created_at
        )
        value(
		p_user_id_1,
        p_user_id_2,
        current_date()
        );
        select c.conversation_id, u.user_id, u.name, u.email, u.avatar, c.created_at from `conversation` c
        join `user` u on c.user_id_1 = u.user_id or c.user_id_2 = u.user_id 
        where c.conversation_id = LAST_INSERT_ID() and u.user_id != p_user_id_1;
	else
        select c.conversation_id, u.user_id, u.name, u.email, u.avatar, c.created_at from `conversation` c
        join `user` u on c.user_id_1 = u.user_id or c.user_id_2 = u.user_id 
        where ((c.user_id_1 = p_user_id_1 and c.user_id_2 = p_user_id_2) or (c.user_id_1 = p_user_id_2 and c.user_id_2 = p_user_id_1)) and u.user_id != p_user_id_1;
	end if;
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateFile` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateFile`(
in p_card_id int,
in p_user_id int,
in p_path longtext,
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
		insert into `file`(
        card_id,
        user_id,
        path
        )
        value(
        p_card_id,
        p_user_id,
        p_path
        );
        select * from `file` where file_id = last_insert_id();
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateGuest` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateGuest`(
in p_board_id int,
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
		insert into `guest`(
        board_id,
        user_id,
        role
        )
        value(
		p_board_id,
        p_user_id,
        p_role
        );
        select user_id, name, email, avatar, status from `user` where user_id = p_user_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateLabel` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateLabelBoard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateMember` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateMember`(
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
		insert into `member`(
        workspace_id,
        user_id,
        role
        )
        value(
		p_workspace_id,
        p_user_id,
        p_role
        );
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateMessage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateMessage`(
in p_conversation_id int,
in p_sender_id int,
in p_message longtext,
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
		insert into `message`(
        conversation_id,
        sender_id,
        message,
        created_at,
        update_at
        )
        value(
		p_conversation_id,
        p_sender_id,
        p_message,
        current_date(),
		current_date()
        );
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateNotification` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateNotification`(
in p_user_id int,
in p_message longtext,
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
		insert into `notification`(
        user_id,
        message,
        notify_time
        )
        value(
        p_user_id,
        p_message,
        CURRENT_TIME()
        );
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateSettingBoard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateSettingCard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateSettingWorkspace` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateUser`(
in p_name varchar(50),
in p_email varchar(100),
in p_password varchar(250),
in p_avatar longtext,
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
		insert into `user`(
        name,
        email,
        password,
        avatar
        )
        value(
        p_name,
        p_email,
        p_password,
        p_avatar
        );
        select * from `user` where user_id = last_insert_id();
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateUserJoinCard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateUserJoinCard`(
    in p_card_id int,
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
    
    begin
        declare updated_user_id_join longtext;
        declare current_user_id_join longtext;
        
        -- Lấy giá trị hiện tại của user_id_join, xử lý NULL
        select ifnull(user_id_join, '') into current_user_id_join
        from `card`
        where card_id = p_card_id;

        -- Thêm user_id mới vào danh sách
        set updated_user_id_join = trim(both ',' from concat(
            current_user_id_join,
            if(current_user_id_join != '', ',', ''), -- Thêm dấu ',' nếu danh sách không rỗng
            cast(p_user_id as char)
        ));

        -- Cập nhật lại cột user_id_join
        update `card`
        set user_id_join = updated_user_id_join
        where card_id = p_card_id;
        
        select user_id, name, email, avatar from `user` where user_id = p_user_id;
    end;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateWorkspace` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteBoard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteBoard`(
in p_board_id int,
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
		delete from `board` where board_id = p_board_id;
		select old_path;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteCard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteCard`(
in p_card_id int,
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
		set old_path = (select background from card where card_id = p_card_id);
		delete from `card` where card_id = p_card_id;
		select old_path;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteCheckList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteCheckList`(
in p_checklist_id int,
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
		delete from `checklist` where checklist_id = p_checklist_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteCheckListName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteCheckListName`(
in p_checklistname_id int,
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
		delete from `checklistname` where checklistname_id = p_checklistname_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteColumn` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteColumn`(
in p_column_id int,
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
		delete from `column` where column_id = p_column_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteComment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteFile` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteFile`(
in p_file_id int,
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
		set old_path = (select `path` from `file` where file_id = p_file_id);
		delete from `file` where file_id = p_file_id;
		select old_path;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteGuest` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteGuest`(
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
		delete from `guest` where board_id = p_board_id and user_id = p_user_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteLabel` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteLabelBoard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteMember` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteMember`(
in p_workspace_id int,
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
		delete from `member` where workspace_id = p_workspace_id and user_id = p_user_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteUserJoincard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteUserJoincard`(
in p_card_id int,
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
    begin
		declare updated_user_id_join longtext;

        select replace(
            concat(',', user_id_join, ','),
            concat(',', cast(p_user_id as char), ','),
            ','
        )
        into updated_user_id_join
        from `card`
        where card_id = p_card_id;

        set updated_user_id_join = trim(both ',' from updated_user_id_join);
        
        update `card`
        set `user_id_join` = updated_user_id_join
        where `card_id` = p_card_id;
	end;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteWorkspace` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteWorkspace`(
in p_workspace_id int,
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
		delete from `workspace` where workspace_id = p_workspace_id;
		select old_path;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetActivityCardByID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetActivityUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetActivityUser`(
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
		select count(distinct(user_id)) as count from activityuser;
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetActivityUserByMonth` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetActivityUserByMonth`(
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
			DATE(created_at) AS date,
			COUNT(DISTINCT user_id) AS user_count
		FROM 
			activityuser
		WHERE 
			MONTH(created_at) = MONTH(CURDATE()) 
			AND YEAR(created_at) = YEAR(CURDATE())
		GROUP BY 
			DATE(created_at)
		ORDER BY 
			DATE(created_at);
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetActivityUserByRange` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetActivityUserByRange`(
    IN p_time_range VARCHAR(10),
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

    IF p_time_range = 'month' THEN
        SELECT 
            DATE(created_at) AS date,
            COUNT(DISTINCT user_id) AS user_count
        FROM 
            activityuser
        WHERE 
            MONTH(created_at) = MONTH(CURDATE())
            AND YEAR(created_at) = YEAR(CURDATE())
        GROUP BY 
            DATE(created_at)
        ORDER BY 
            DATE(created_at);

    ELSEIF p_time_range = 'week' THEN
        SELECT 
            DATE(created_at) AS date,
            COUNT(DISTINCT user_id) AS user_count
        FROM 
            activityuser
        WHERE 
            WEEK(created_at, 1) = WEEK(CURDATE(), 1)
            AND YEAR(created_at) = YEAR(CURDATE())
        GROUP BY 
            DATE(created_at)
        ORDER BY 
            DATE(created_at);

    ELSE
        SET p_error_code = 1;
        SET p_error_message = 'Invalid time range. Use "month" or "week".';
    END IF;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllCardByBoardID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllCardByBoardID`(
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
		select *, 
        (SELECT JSON_ARRAYAGG(
			   JSON_OBJECT(
				   'user_id', u.user_id, 
				   'name', u.name,
				   'email', u.email,
				   'avatar', u.avatar
				   )
			) 
		 FROM `user` u
		 WHERE FIND_IN_SET(u.user_id, (SELECT user_id_join FROM `card` WHERE card_id = c.card_id)) > 0
		 ) AS 'userjoin'
         from card c where 
		c.column_id in (select column_id from `column` where board_id = p_board_id);
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllColumnByBoardID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllColumnByBoardID`(
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
		select * from `column` where board_id = p_board_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllUser`(
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
		select * from user;
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllWorkspaceByUserIdGuest` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllWorkspaceByUserIdGuest`(
in p_user_id varchar(100),
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
			ws.workspace_id,
			ws.name AS workspace_name,
			ws.logo,
			ws.description AS workspace_description,
			ws.status AS workspace_status,
			IF(
				COUNT(DISTINCT g.board_id) = 0,
				JSON_ARRAY(),
				JSON_ARRAYAGG(
					JSON_OBJECT(
						'board_id', b.board_id,
						'name', b.name,
						'description', b.description,
						'background', b.background,
						'status', b.status
					)
				)
			) AS boards
		FROM 
			`WorkSpace` ws
		LEFT JOIN 
			`Board` b ON b.workspace_id = ws.workspace_id
		LEFT JOIN 
			`Guest` g ON g.board_id = b.board_id AND g.user_id = p_user_id
		WHERE 
			g.board_id IS NOT NULL
			AND ws.workspace_id NOT IN (SELECT workspace_id FROM `Member` WHERE user_id = p_user_id)
		GROUP BY 
			ws.workspace_id;
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllWorkspaceByUserIdMember` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllWorkspaceByUserIdMember`(
in p_user_id varchar(100),
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
			ws.workspace_id,
			ws.name AS workspace_name,
			ws.logo,
			ws.description AS workspace_description,
			ws.status AS workspace_status,
            m.role,
			IF(
				COUNT(DISTINCT g.board_id) = 0,
				JSON_ARRAY(),
				JSON_ARRAYAGG(
					JSON_OBJECT(
						'board_id', b.board_id,
						'name', b.name,
						'description', b.description,
						'background', b.background,
						'status', b.status
					)
				)
			) AS boards
		FROM 
			`WorkSpace` ws
		JOIN 
			`Member` m ON ws.workspace_id = m.workspace_id
		LEFT JOIN 
			`Board` b ON b.workspace_id = ws.workspace_id
		LEFT JOIN 
			`Guest` g ON g.board_id = b.board_id AND g.user_id = p_user_id
		WHERE 
			m.user_id = p_user_id
			AND (g.board_id IS NOT NULL OR b.board_id IS NULL)
		GROUP BY 
			m.role,
			ws.workspace_id;
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetBoardByCustom` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetBoardByCustom`(
in p_board_id int,
in p_user_id int,
in p_card_status varchar(50),
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
		b.name,
		b.description,
		b.background,
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
														'description', sorted_cards.description,
                                                        'background', sorted_cards.background, 
                                                        'status', sorted_cards.status,
                                                        'start_date', sorted_cards.start_date,
                                                        'end_date', sorted_cards.end_date,
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
                                            cd.description,
                                            cd.start_date,
                                            cd.end_date,
                                            cd.status,
											FIND_IN_SET(cd.card_id, (SELECT card_id_order FROM `column` WHERE column_id = sorted_columns.column_id)) AS order_value
										FROM `card` cd
										RIGHT JOIN `column` cl ON cl.column_id = cd.column_id
										WHERE FIND_IN_SET(cd.card_id, (SELECT card_id_order FROM `column` WHERE column_id = sorted_columns.column_id)) > 0
										AND (
												(p_user_id IS NULL AND (cd.user_id_join = '' OR cd.user_id_join IS NULL)) 
												OR 
												(p_user_id IS NOT NULL AND EXISTS (
													SELECT 1 
													FROM `user` u_check 
													WHERE u_check.user_id = p_user_id 
													AND FIND_IN_SET(u_check.user_id, cd.user_id_join) > 0
												))
											)
										AND (
											p_card_status IS NULL OR cd.status = p_card_status
                                        )
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
	WHERE 
		b.board_id = p_board_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetBoardById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
                                                        'description', sorted_cards.description,
                                                        'background', sorted_cards.background, 
                                                        'status', sorted_cards.status,
                                                        'start_date', sorted_cards.start_date,
                                                        'end_date', sorted_cards.end_date,
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
                                            cd.start_date,
                                            cd.end_date,
                                            cd.description,
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetCard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCard`(
    IN p_user_id INT,
    IN p_option VARCHAR(10),
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

    IF p_option = 'mycard' THEN
		SELECT cd.card_id, cd.name as card_name, cd.start_date, cd.end_date, cd.status as card_status, b.board_id, b.name as board_name, w.workspace_id, w.name as workspace_name
		FROM card cd
		LEFT JOIN `column` cl ON cl.column_id = cd.column_id
		LEFT JOIN `board` b ON b.board_id = cl.board_id
		LEFT JOIN `workspace` w ON w.workspace_id = b.workspace_id
		WHERE FIND_IN_SET(p_user_id, user_id_join);

    ELSEIF p_option = 'allcard' THEN
		SELECT DISTINCT cd.card_id, cd.name as card_name, cd.start_date, cd.end_date, 
                cd.status as card_status, b.board_id, b.name as board_name, 
                w.workspace_id, w.name as workspace_name,
				(SELECT JSON_ARRAYAGG(
					   JSON_OBJECT(
						   'user_id', u.user_id, 
						   'name', u.name,
						   'email', u.email,
						   'avatar', u.avatar
						   )
					) 
				 FROM `user` u
				 WHERE FIND_IN_SET(u.user_id, (SELECT user_id_join FROM `card` WHERE card_id = cd.card_id)) > 0
				 ) as 'userjoin'
		FROM card cd
		LEFT JOIN `column` cl ON cl.column_id = cd.column_id
		LEFT JOIN `board` b ON b.board_id = cl.board_id
		LEFT JOIN `workspace` w ON w.workspace_id = b.workspace_id
		LEFT JOIN `member` m ON m.workspace_id = b.workspace_id
		LEFT JOIN `guest` g ON g.board_id = b.board_id
		WHERE 
			(g.user_id = p_user_id AND g.role = 'own') 
			OR (m.user_id = p_user_id AND m.role = 'own');
    ELSE
        SET p_error_code = 1;
        SET p_error_message = 'Invalid time range. Use "month" or "week".';
    END IF;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetCardByColumn` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCardByColumn`(
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
		select distinct(col.name) as "column_name", count(card_id) as "card_number" from card c 
		left join `column` col on col.column_id = c.column_id
		where c.column_id in (select column_id from `column` where board_id = p_board_id)
		group by col.name;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetCardByID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetCardByUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCardByUser`(
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
		SELECT u.name AS user_name, COUNT(c.card_id) AS card_number
		FROM `user` u
		JOIN card c ON FIND_IN_SET(u.user_id, c.user_id_join) > 0
		WHERE c.column_id IN (
			SELECT column_id
			FROM `column`
			WHERE board_id = p_board_id
		)
		GROUP BY u.name
		UNION
		SELECT 'Không có người tham gia', COUNT(c.card_id) AS card_number
		FROM card c
		WHERE c.column_id IN (
			SELECT column_id
			FROM `column`
			WHERE board_id = p_board_id
		)
		AND c.user_id_join IS NULL or c.user_id_join = "";
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetCardDetailsInWeek` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCardDetailsInWeek`(
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
    
    START TRANSACTION;

    SELECT 
        card_id,
        name,
        start_date,
        end_date,
        status,
        DATE(start_date + INTERVAL seq DAY) AS selected_date,
        user_id_join
    FROM 
        card
    JOIN (
        SELECT 0 AS seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 
        UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6
    ) AS seq_table
    ON DATE(start_date + INTERVAL seq_table.seq DAY) <= DATE(end_date)
    AND DATE(start_date + INTERVAL seq_table.seq DAY) BETWEEN 
        DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AND 
        DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY)
    WHERE 
        FIND_IN_SET(p_user_id, user_id_join)
    ORDER BY 
        selected_date, card_id;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetCardEndDate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCardEndDate`(
    IN p_user_id INT,
    IN p_option VARCHAR(10),
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

    IF p_option = 'mycard' THEN
		SELECT cd.card_id, cd.name as card_name, cd.start_date, cd.end_date, cd.status as card_status, b.board_id, b.name as board_name, w.workspace_id, w.name as workspace_name
		FROM card cd
		LEFT JOIN `column` cl ON cl.column_id = cd.column_id
		LEFT JOIN `board` b ON b.board_id = cl.board_id
		LEFT JOIN `workspace` w ON w.workspace_id = b.workspace_id
		WHERE (end_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 2 DAY)) AND FIND_IN_SET(p_user_id, user_id_join);

    ELSEIF p_option = 'allcard' THEN
		SELECT DISTINCT cd.card_id, cd.name as card_name, cd.start_date, cd.end_date, cd.status as card_status, 
                b.board_id, b.name as board_name, w.workspace_id, w.name as workspace_name
		FROM card cd
		LEFT JOIN `column` cl ON cl.column_id = cd.column_id
		LEFT JOIN `board` b ON b.board_id = cl.board_id
		LEFT JOIN `workspace` w ON w.workspace_id = b.workspace_id
		LEFT JOIN `member` m ON m.workspace_id = b.workspace_id
		LEFT JOIN `guest` g ON g.board_id = b.board_id
		WHERE 
			(g.user_id = p_user_id AND g.role = 'own' AND (cd.end_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 2 DAY))) 
			OR (m.user_id = p_user_id AND m.role = 'own' AND (cd.end_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 2 DAY)));
    ELSE
        SET p_error_code = 1;
        SET p_error_message = 'Invalid time range. Use "month" or "week".';
    END IF;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetCardInWeek` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCardInWeek`(
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
        DATE(selected_date) AS date,
        COUNT(DISTINCT card_id) AS card_count
	FROM (
		SELECT
			card_id,
			DATE(start_date + INTERVAL seq DAY) AS selected_date
		FROM 
			card
		JOIN (
			SELECT 0 AS seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 
			UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6
		) AS seq_table
		ON DATE(start_date + INTERVAL seq_table.seq DAY) <= DATE(end_date)
		AND DATE(start_date + INTERVAL seq_table.seq DAY) BETWEEN 
			DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AND 
			DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY)
		WHERE 
			FIND_IN_SET(p_user_id, user_id_join)
	) AS expanded_dates
	GROUP BY 
		DATE(selected_date)
	ORDER BY 
		DATE(selected_date);
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetConversationByUserID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetConversationByUserID`(
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
		WITH LatestMessage AS (
			SELECT 
				m.conversation_id,
				m.message,
				ROW_NUMBER() OVER (PARTITION BY m.conversation_id ORDER BY m.message_id DESC) AS rn
			FROM `message` m
		)
		SELECT DISTINCT
			u.user_id,
			c.conversation_id,
			u.name,
			u.email,
			u.avatar,
			c.created_at,
			lm.message
		FROM `conversation` c
		JOIN `user` u 
			ON c.user_id_1 = u.user_id OR c.user_id_2 = u.user_id
		LEFT JOIN LatestMessage lm 
			ON lm.conversation_id = c.conversation_id AND lm.rn = 1
		WHERE (c.user_id_1 = p_user_id OR c.user_id_2 = p_user_id)
		  AND u.user_id != p_user_id
		ORDER BY c.created_at DESC;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetGuestByWorkspaceID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetLabelBoardByID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetMemberByWorkspaceID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetMemberByWorkspaceID`(
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

    select u.user_id, u.name, u.email, u.avatar, m.role from `member` m left join `user` u on m.user_id = u.user_id
    where m.workspace_id = p_workspace_id; 
		
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetMessageByConversationID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetMessageByConversationID`(
in p_conversation_id int,
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
		select m.message_id, m.sender_id, u.name, u.avatar, m.message, m.created_at, m.update_at 
		from `message` m join `user` u on m.sender_id = u.user_id 
		where m.conversation_id = p_conversation_id
        order by m.message_id asc;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetNewUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetNewUser`(
in p_month int,
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
		SELECT COUNT(*) as count
		FROM user
		WHERE created_at BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL p_month MONTH), '%Y-%m-01') AND DATE_FORMAT(CURDATE(), '%Y-%m-01');
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetNotificationByUserId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetNotificationByUserId`(
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetNotificationRead` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetNotificationRead`(
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
		select * from `notification`
		where is_sent = 1 and user_id = p_user_id
        order by notification_id desc;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetSearch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSearch`(
in p_search varchar(100),
in p_user_id int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
	DECLARE workspace_result JSON;
	DECLARE board_result JSON;
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'workspace_id', w.workspace_id, 
                'name', w.name,
                'logo', w.logo
            )
        ) INTO workspace_result
        FROM workspace w
		INNER JOIN member m ON m.workspace_id = w.workspace_id
		WHERE w.name LIKE CONCAT('%', p_search, '%') AND m.user_id = p_user_id;

    SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
        'board_id', board_id, 
        'workspace_id', workspace_id,
        'workspace_name', workspace_name,
        'board_name', board_name,
        'background', background
    )
) INTO board_result
FROM (
    SELECT DISTINCT
        b.board_id, 
        b.workspace_id,
        w.name AS workspace_name,
        b.name AS board_name,
        b.background
    FROM board b
    INNER JOIN workspace w ON w.workspace_id = b.workspace_id
    INNER JOIN member m ON m.workspace_id = w.workspace_id
    INNER JOIN guest g ON g.board_id = b.board_id
    WHERE b.name LIKE CONCAT('%', p_search, '%')
      AND (
            b.status = 'public'
            OR (b.status = 'workspace' AND (m.user_id = p_user_id OR g.user_id = p_user_id))
            OR (b.status = 'private' AND (m.role = 'own' OR g.user_id = p_user_id))
        )
) subquery;


        SELECT workspace_result AS workspace, board_result AS board;
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetSettingBoardByID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetSettingCardByID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetSettingWorkspaceByID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetUserByAccount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserByAccount`(
in p_email varchar(100),
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
		select * from `user`
        where email = p_email;
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetUserByEmail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserByEmail`(
in p_email varchar(100),
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
		select user_id, name, email, avatar, password from `user`
        where email like CONCAT('%', p_email, '%');
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetUserGrowthRate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserGrowthRate`(
in p_month int,
out p_error_code int,
out p_error_message varchar(500)
)
begin
    DECLARE start_users INT DEFAULT 0;
    DECLARE end_users INT DEFAULT 0;
    DECLARE growth DECIMAL(10,2) DEFAULT 0;
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
    end;
    set p_error_code = 0;
    set p_error_message = '';
    start transaction;
		SELECT COUNT(*) INTO start_users
		FROM user
		WHERE created_at < DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL p_month MONTH), '%Y-%m-01');

		SELECT COUNT(*) INTO end_users FROM user;

		IF start_users = 0 THEN
			SET growth = 0;
		ELSE
			SET growth = ((end_users - start_users) / start_users) * 100;
		END IF;
		SELECT growth;
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetWorkspaceByID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateBackgroundBoard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateBoardWhenMoveColumn` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateBoardWhenMoveColumn`(
in p_board_id int,
in p_column_id_order longtext,
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
		`column_id_order` = p_column_id_order
		where `board_id` = p_board_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateCardByColumnID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateCardByColumnID`(
in p_card_id int,
in p_column_id int,
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
		update `card`
		set
		`column_id` = p_column_id	
		where `card_id` = p_card_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateCheckList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateCheckListName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateCheckListName`(
in p_checklistname_id int,
in p_name varchar(100),
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
		update `checklistname`
		set
		`name` = p_name
		where `checklistname_id` = p_checklistname_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateColumnWhenMoveCard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateColumnWhenMoveCard`(
in p_column_id int,
in p_card_id int,
in p_card_id_order_new longtext,
in p_card_id_order_old longtext,
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
		begin
			update `column`
			set
			`card_id_order` = p_card_id_order_new
			where `column_id` = p_column_id;
        end;
		if((select column_id from `card` where card_id = p_card_id) <> p_column_id)
		then
				update `column`
				set
				`card_id_order` = p_card_id_order_old
				where `column_id` = (select column_id from `card` where card_id = p_card_id);
				
				update `card`
				set
				`column_id` = p_column_id
				where `card_id` = p_card_id;
		end if;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateComment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateIBoard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateICard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateICard`(
in p_card_id int,
in p_name varchar(100),
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
		update `card`
		set
		`name` = p_name,
        `description` = p_description
		where `card_id` = p_card_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateIColumn` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateIColumn`(
in p_column_id int,
in p_board_id int,
in p_name varchar(100),
in p_background longtext,
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
		update `column`
		set
        `board_id` = p_board_id,
		`name` = p_name,
		`background` = p_background,
		`status` = p_status
		where `column_id` = p_column_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateIWorkspace` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateLabelBoard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateLogoWorkspace` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateNotificationRead` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateNotificationRead`(
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
		update `notification`
		set
		`is_read` = 1
		where `is_read` = 0 and `is_sent` = 1 and `user_id` = p_user_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateNotificationSent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateNotificationSent`(
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
		update `notification`
		set
		`is_sent` = 1
		where `is_sent` = 0;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateRoleGuest` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateRoleGuest`(
in p_board_id int,
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
		update `guest`
		set
		`role` = p_role
		where `board_id` = p_board_id and `user_id` = p_user_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateRoleMember` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateSettingBoard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateSettingCard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateSettingWorkspace` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateStatusCard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateStatusCard`(
in p_card_id int,
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
		update `card`
		set
        `status` = p_status
		where `card_id` = p_card_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateTimeCard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateTimeCard`(
in p_card_id int,
in p_start_date datetime,
in p_end_date datetime,
in p_timer datetime,
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
		update `card`
		set
		`start_date` = p_start_date,
        `end_date` = p_end_date,
        `timer` = p_timer
		where `card_id` = p_card_id;
	commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-30 23:29:35
