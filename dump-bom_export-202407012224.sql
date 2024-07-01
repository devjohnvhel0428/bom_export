-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: localhost    Database: bom_export
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.22.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Accessory`
--

DROP TABLE IF EXISTS `Accessory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Accessory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `footprint` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `data` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `manufacturer` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `create_date` date NOT NULL,
  `create_user` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `database_reference` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2325 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Accessory`
--

LOCK TABLES `Accessory` WRITE;
/*!40000 ALTER TABLE `Accessory` DISABLE KEYS */;
/*!40000 ALTER TABLE `Accessory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES (22,'Abbot Trewhela'),(87,'Abdel Coots'),(52,'Adelbert Gayter'),(80,'Agretha Sayce'),(41,'Alfred Brimmicombe'),(7,'Alyson Connikie'),(98,'Amargo Jackman'),(40,'Ambrosius Oland'),(63,'Anatola Oldale'),(71,'Angel Mariault'),(95,'Antonietta Crottagh'),(8,'Ardisj Onions'),(92,'Ari Dugan'),(12,'Arlinda Oluwatoyin'),(77,'Ashton MacDonagh'),(96,'Astrix Tomczykowski'),(58,'Bax Chastelain'),(69,'Bettye Winscomb'),(59,'Blondelle Coatham'),(28,'Bondon Fealy'),(99,'Brooks Marsh'),(55,'Buck Verrico'),(42,'Cahra Netting'),(3,'Cal Titcom'),(33,'Cammi Guiduzzi'),(65,'Celia Oehm'),(68,'Charin Spacie'),(20,'Charleen Stuke'),(16,'Cherie Stoile'),(84,'Chrisse Springett'),(82,'Christoforo Slafford'),(19,'Clarey Mannakee'),(72,'Clarie Cust'),(74,'Cleavland Hackly'),(86,'Codi Ranger'),(10,'Conchita Aberdeen'),(73,'Conni Inkin'),(35,'Cori Duny'),(4,'Courtnay Sibthorpe'),(31,'Courtney Bangham'),(15,'Crista Spykins'),(27,'Cthrine Darley'),(61,'Cybill Varnals'),(38,'Cynthia Shaylor'),(24,'Dacie Beccero'),(32,'Dimitry Coil'),(79,'Dora Hanscombe'),(53,'Dorothee Adger'),(60,'Evelyn Maffia'),(23,'Evie Collingham'),(21,'Flor Stollmeyer'),(36,'Jamie Matczak'),(83,'Kari Cownden'),(49,'Kariotta Gange'),(5,'Keane Cuddihy'),(43,'Kipp Tale'),(25,'Krispin Coyish'),(66,'Kyrstin Revie'),(29,'Leanora Weeds'),(56,'Loella McGougan'),(11,'Lorinda Tritton'),(39,'Luce Camings'),(48,'Lyle Fontaine'),(90,'Mab Spillane'),(30,'Magdaia Conradie'),(88,'Marc Weekly'),(37,'Marcie Bool'),(89,'Marcille Pesselt'),(50,'Marwin Dionis'),(14,'Maryjane Albany'),(18,'Mela Woltman'),(62,'Mellisent Charon'),(47,'Natal Follos'),(34,'Nettle Fain'),(81,'Noelyn Hanselmann'),(64,'Norrie Tisun'),(76,'Ophelia Alti'),(6,'Patience Osment'),(57,'Pearce Chetwind'),(97,'Philippa Knowlys'),(70,'Prent Sapauton'),(94,'Rafaelia Giraudeau'),(2,'Rebbecca Caney'),(93,'Reed Nixon'),(9,'Renell Eliez'),(78,'Roberto Yoell'),(91,'Rocky Keep'),(13,'Roley Birkenshaw'),(1,'Roselia Hay'),(54,'Rowan Standen'),(85,'Salaidh Ackenhead'),(26,'Sara-ann Lambotin'),(67,'Shay Dempsey'),(17,'Shep Seale'),(75,'Shermy Kobera'),(44,'Sofia MacWhan'),(46,'Tess Grisenthwaite'),(45,'Theresina Seak'),(51,'Tibold Raulstone'),(100,'Tilda Jurkowski');
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderDetail`
--

DROP TABLE IF EXISTS `OrderDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderDetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `designators` text COLLATE utf8mb4_general_ci NOT NULL,
  `accessory_id` int NOT NULL,
  `qty` smallint NOT NULL,
  `part_number` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2302 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderDetail`
--

LOCK TABLES `OrderDetail` WRITE;
/*!40000 ALTER TABLE `OrderDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `OrderDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderHeader`
--

DROP TABLE IF EXISTS `OrderHeader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderHeader` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `order_date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderHeader`
--

LOCK TABLES `OrderHeader` WRITE;
/*!40000 ALTER TABLE `OrderHeader` DISABLE KEYS */;
/*!40000 ALTER TABLE `OrderHeader` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_user` int DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `n_f` text COLLATE utf8mb4_general_ci,
  `edit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (1,'ADMIN'),(2,'USER');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAccount`
--

DROP TABLE IF EXISTS `UserAccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserAccount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password_reset_token` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `active` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password_reset_token` (`password_reset_token`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAccount`
--

LOCK TABLES `UserAccount` WRITE;
/*!40000 ALTER TABLE `UserAccount` DISABLE KEYS */;
INSERT INTO `UserAccount` VALUES (1,'admin','admin@mail.com','$2a$10$GPzWAE.YYT6DDi7xhBOK6eNCDi1b/TvyXsNZSDoqu7V1qN.VYei3e','3xopbusewalfceanyw2lem3cioubiefobprdnc55',_binary ''),(116,'naruto90428','fullstackdever425@gmail.com','$2b$10$2TNiTqXbIE8Dpz08XSZhle0UIHECDfBWdRLVNCTEyB0miUiFfBn8W','56pyvhcbctkih6i9o80hyrwnvf5tm6eb65pxdq74',_binary '');
/*!40000 ALTER TABLE `UserAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserRole`
--

DROP TABLE IF EXISTS `UserRole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserRole` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserRole`
--

LOCK TABLES `UserRole` WRITE;
/*!40000 ALTER TABLE `UserRole` DISABLE KEYS */;
INSERT INTO `UserRole` VALUES (1,1),(1,2),(2,1),(2,2),(3,1),(3,2),(4,1),(4,2),(5,1),(5,2),(6,1),(6,2),(7,1),(7,2),(8,1),(8,2),(9,1),(9,2),(10,1),(10,2),(11,1),(11,2),(12,1),(12,2),(13,1),(13,2),(14,1),(14,2),(15,1),(15,2),(16,1),(16,2),(17,1),(17,2),(18,1),(18,2),(19,1),(19,2),(20,1),(20,2),(21,1),(21,2),(22,1),(22,2),(23,1),(23,2),(24,1),(24,2),(25,1),(25,2),(26,1),(26,2),(27,1),(27,2),(28,1),(28,2),(29,1),(29,2),(30,1),(30,2),(31,1),(31,2),(32,1),(32,2),(33,1),(33,2),(34,1),(34,2),(35,1),(35,2),(36,1),(36,2),(37,1),(37,2),(38,1),(38,2),(39,1),(39,2),(40,1),(40,2),(41,1),(41,2),(42,1),(42,2),(43,1),(43,2),(44,1),(44,2),(45,1),(45,2),(46,1),(46,2),(47,1),(47,2),(48,1),(48,2),(49,1),(49,2),(50,1),(50,2),(51,1),(51,2),(52,1),(52,2),(53,1),(53,2),(54,1),(54,2),(55,1),(55,2),(56,1),(56,2),(57,1),(57,2),(58,1),(58,2),(59,1),(59,2),(60,1),(60,2),(61,1),(61,2),(62,1),(62,2),(63,1),(63,2),(64,1),(64,2),(65,1),(65,2),(66,1),(66,2),(67,1),(67,2),(68,1),(68,2),(69,1),(69,2),(70,1),(70,2),(71,1),(71,2),(72,1),(72,2),(73,1),(73,2),(74,1),(74,2),(75,1),(75,2),(76,1),(76,2),(77,1),(77,2),(78,1),(78,2),(79,1),(79,2),(80,1),(80,2),(81,1),(81,2),(82,1),(82,2),(83,1),(83,2),(84,1),(84,2),(85,1),(85,2),(86,1),(86,2),(87,1),(87,2),(88,1),(88,2),(89,1),(89,2),(90,1),(90,2),(91,1),(91,2),(92,1),(92,2),(93,1),(93,2),(94,1),(94,2),(95,1),(95,2),(96,1),(96,2),(97,1),(97,2),(98,1),(98,2),(99,1),(99,2),(100,1),(100,2),(101,2),(108,1),(108,2),(109,1),(109,2),(114,2),(116,2);
/*!40000 ALTER TABLE `UserRole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bom_export'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-01 22:24:50
