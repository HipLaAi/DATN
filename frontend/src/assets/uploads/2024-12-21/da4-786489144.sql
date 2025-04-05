-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: da_4
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,2,'Test 1',NULL,'uploads\\2024-12-07\\Cute-789336804.png','5,1,6,2,7','public'),(2,5,'Bảng 2','','uploads\\2024-11-12\\your name Thumbnail-600442964.jpg','','public'),(3,6,'Bảng 5','','uploads\\2024-12-07\\nền-457324446.png','','private'),(4,6,'Bảng 6','\'\'','uploads\\2024-12-07\\scaramouche-915305697.png',NULL,'private'),(6,2,'Bảng 7','Test tạo bangr','uploads\\2024-12-09\\scaramouche-632427362.png',NULL,'public'),(7,9,'Bảng 7','Test guest','uploads\\2024-12-12\\1096399-973253675.png','5,1,6,2,7','public'),(8,9,'Bảng 8','Test guest','uploads\\2024-12-12\\1096399-411188858.png',NULL,'public');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (1,1,'Card 1','Test update','uploads\\2024-12-08\\e5dba233335efe90c6089cd71bcaa470-927053567.jpg','1,2',NULL,NULL,NULL,'private'),(2,1,'Card 2',NULL,NULL,NULL,NULL,NULL,NULL,'private'),(3,1,'Card 3',NULL,NULL,NULL,NULL,NULL,NULL,'private'),(5,1,'Card 5',NULL,NULL,NULL,NULL,NULL,NULL,'public'),(6,1,'Card 6',NULL,NULL,NULL,NULL,NULL,NULL,'public');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklist`
--

LOCK TABLES `checklist` WRITE;
/*!40000 ALTER TABLE `checklist` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklistname`
--

LOCK TABLES `checklistname` WRITE;
/*!40000 ALTER TABLE `checklistname` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `column`
--

LOCK TABLES `column` WRITE;
/*!40000 ALTER TABLE `column` DISABLE KEYS */;
INSERT INTO `column` VALUES (1,1,'Column 1',NULL,'6,5,2,1,3','private'),(2,1,'Column 2',NULL,'','private'),(5,1,'Column 4',NULL,NULL,'public'),(6,1,'Column 5',NULL,NULL,'public'),(7,1,'Column 7',NULL,NULL,'public');
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
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `card_id` (`card_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation`
--

LOCK TABLES `conversation` WRITE;
/*!40000 ALTER TABLE `conversation` DISABLE KEYS */;
INSERT INTO `conversation` VALUES (1,1,2,'2024-12-05 00:00:00'),(2,1,4,'2024-12-05 00:00:00'),(3,1,5,'2024-12-05 00:00:00'),(4,4,5,'2024-12-05 00:00:00'),(5,2,5,'2024-12-05 00:00:00'),(6,2,4,'2024-12-05 00:00:00'),(7,2,7,'2024-12-05 00:00:00');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
INSERT INTO `guest` VALUES (1,1,'guest'),(2,1,'guest'),(4,1,'guest'),(7,1,'own'),(7,2,'guest'),(8,1,'own');
/*!40000 ALTER TABLE `guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `label`
--

DROP TABLE IF EXISTS `label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `label` (
  `board_id` int NOT NULL,
  `card_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `background` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`board_id`,`card_id`),
  KEY `card_id` (`card_id`),
  CONSTRAINT `label_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `label_ibfk_2` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `label`
--

LOCK TABLES `label` WRITE;
/*!40000 ALTER TABLE `label` DISABLE KEYS */;
/*!40000 ALTER TABLE `label` ENABLE KEYS */;
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
INSERT INTO `member` VALUES (2,2,'own'),(2,4,'member'),(6,1,'member'),(7,1,'member'),(8,1,'own'),(9,1,'own');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,1,1,'Hello tôi là user có id là 1',_binary '\0','2024-12-05 00:00:00','2024-12-05 00:00:00'),(2,1,2,'Hello tôi là user có id là 2',_binary '\0','2024-12-05 00:00:00','2024-12-05 00:00:00'),(3,1,2,'2',_binary '\0','2024-12-05 00:00:00','2024-12-05 00:00:00'),(4,1,2,'hai',_binary '\0','2024-12-05 00:00:00','2024-12-05 00:00:00');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
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
  `created_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'VuVanHiep','vuvanhiep@gmail.com','$2b$10$/Xp8OyhKQ9ZeBMnR1PF68.DIbFH/.r./TiRW7vD9UVZE4z9OkTteW',NULL,NULL,NULL,NULL,NULL),(2,'VuQuangYen','vuquangyen@gmail.com','$2b$10$hUhSnGVyNJczRasGR0c4ZO3p6aDLHfgUkprZYNjbeVdlFHZIpobOm',NULL,NULL,NULL,NULL,NULL),(4,'VuQuangHung','vuquanghung@gmail.com','$2b$10$ZGxsntRhTB8Wyt9oxjKHIuHV5ue7lQLvJbGeVBDjJu0zWyNBHFeK.',NULL,NULL,NULL,NULL,NULL),(5,'NguyenThiLien','nguyenthilien@gmail.com','$2b$10$t4xoc0c3KDlLOibs/6PbHuRRCUi41qhWDBNow8VakzDJ8o3vQNfXC',NULL,NULL,NULL,NULL,NULL),(7,'AnThiThuHien','anthithuhien@gmail.com','$2b$10$G57/J8BQUaXytwGNXoMOyO4l2xlwz6gkqVUY4bHMujhP//s/evKQa',NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workspace`
--

LOCK TABLES `workspace` WRITE;
/*!40000 ALTER TABLE `workspace` DISABLE KEYS */;
INSERT INTO `workspace` VALUES (2,'Không gian làm việc 2','uploads\\2024-12-07\\sad-256353810.jpeg','','public'),(5,'Không gian làm việc 5','uploads\\2024-12-07\\Màu Xanh Cậu Bé Cảm Xúc Đáng Yêu Câu Tỏ Tình Dễ Thương Bài Đăng Facebook-206040783.png','ok','private'),(6,'Không gian làm việc 6','uploads\\2024-12-09\\Cute-748738606.png','Test','public'),(7,'Không gian làm việc 7','uploads\\2024-12-09\\scaramouche-117399017.png','Test tạo không gian làm việc','public'),(8,'Không gian làm việc 8','uploads\\2024-12-10\\319690684_1618097158626342_5256390001683297320_n-569163466.jpg','Test','public'),(9,'Không gian làm việc 9','uploads\\2024-12-12\\1096399-640101626.png','Test mêmber','public');
/*!40000 ALTER TABLE `workspace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'da_4'
--
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
        call GetBoardByID(last_insert_id(), @err, @msg);
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
		select * from `card` where card_id = last_insert_id();
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
        'guest'
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
        'member'
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
        password
        )
        value(
        p_name,
        p_email,
        p_password
        );
    commit;
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
	declare exit handler for sqlexception
    begin
		get diagnostics condition 1 p_error_code = returned_sqlstate, p_error_message = message_text;
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
        insert into `member`(
        workspace_id,
        user_id,
        role
        )
        value(
        last_insert_id(),
        p_user_id,
        'own'
        );
        
        call GetWorkspaceByID(last_insert_id(), @err, @msg);
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
			ws.workspace_id;
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
	WHERE 
		b.board_id = p_board_id;
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

    SELECT 
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
        IF(
            COUNT(cln.checklistname_id) = 0,
            JSON_ARRAY(),
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'checklistname_id', cln.checklistname_id,
                    'name', cln.name,
                    'checklist', 
                    IF(
                        (SELECT COUNT(*) FROM `checklist` cl WHERE cl.checklistname_id = cln.checklistname_id) = 0,
                        JSON_ARRAY(),
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
                        )
                    )
                )
            )
        ) AS `checklistname`,
        IF(
            COUNT(cm.comment_id) = 0,
            JSON_ARRAY(),
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'comment_id', cm.comment_id,
                    'user_id', cm.user_id,
                    'comment', cm.comment,
                    'status', cm.status
                )
            )
        ) AS `comment`,
        IF(
            COUNT(f.file_id) = 0,
            JSON_ARRAY(),
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'user_id', f.user_id,
                    'path', f.path
                )
            )
        ) AS `file`,
        IF(
            COUNT(l.card_id AND l.board_id) = 0,
            JSON_ARRAY(),
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'name', l.name,
                    'background', l.background
                )
            )
        ) AS `label`
    FROM 
        `card` cd
    LEFT JOIN `checklistname` cln ON cd.card_id = cln.card_id
    LEFT JOIN `comment` cm ON cd.card_id = cm.card_id
    LEFT JOIN `file` f ON cd.card_id = f.card_id
    LEFT JOIN `label` l ON cd.card_id = l.card_id
    WHERE 
        cd.card_id = p_card_id
    GROUP BY 
        cd.card_id, 
        cd.column_id, 
        cd.name, 
        cd.description, 
        cd.background, 
        cd.user_id_join, 
        cd.start_date, 
        cd.end_date, 
        cd.timer, 
        cd.status;

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
		select c.conversation_id, u.user_id, u.name, u.email, u.avatar, c.created_at from `conversation` c join `user` u on c.user_id_1 = u.user_id or c.user_id_2 = u.user_id 
		where (c.user_id_1 = p_user_id or c.user_id_2 = p_user_id) and (u.user_id) != p_user_id;
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
		where m.conversation_id = 1;
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
		select user_id, name, email, avatar from `user`
        where email like CONCAT('%', p_email, '%');
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
		select 
			w.workspace_id,
			w.name,
			w.logo,
			w.description,
			w.status,
			 IF(
				COUNT(b.board_id) = 0,
				JSON_ARRAY(),
				JSON_ARRAYAGG(
					JSON_OBJECT(
						'board_id', b.board_id,
						'name', b.name,
						'background', b.background,
						'status', b.status
					)
				)
			) AS "board"
		from `workspace` w
		left join `board` b on w.workspace_id = b.workspace_id
		where w.workspace_id = p_workspace_id
		group by w.workspace_id;
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
/*!50003 DROP PROCEDURE IF EXISTS `UpdateCard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateCard`(
in p_card_id int,
in p_name varchar(100),
in p_description longtext,
in p_background longtext,
in p_user_id_join longtext,
in p_start_date datetime,
in p_end_date datetime,
in p_timer datetime,
in p_status varchar(50),
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
		set old_path = (select background from `card` where card_id = p_card_id);
		update `card`
		set
		`name` = p_name,
        `description` = p_description,
		`background` = p_background,
        `user_id_join` = p_user_id_join,
		`start_date` = p_start_date,
        `end_date` = p_end_date,
        `timer` = p_timer,
		`status` = p_status
		where `card_id` = p_card_id;
        select old_path;
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
in p_background longtext,
in p_status varchar(50),
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
        `workspace_id` = p_workspace_id,
		`name` = p_name,
		`description` = p_description,
		`background` = p_background,
		`status` = p_status
		where `board_id` = p_board_id;
        select old_path;
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
/*!50003 DROP PROCEDURE IF EXISTS `UpdateWorkspace` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateWorkspace`(
in p_workspace_id int,
in p_name varchar(100),
in p_description longtext,
in p_status varchar(50),
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
		`name` = p_name,
		`logo` = p_logo,
		`description` = p_description,
		`status` = p_status
		where `workspace_id` = p_workspace_id;
        select old_path;
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

-- Dump completed on 2024-12-13 14:34:06
