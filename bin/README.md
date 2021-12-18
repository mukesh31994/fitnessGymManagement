-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fitness_management
-- ------------------------------------------------------
-- Server version	5.7.36-log

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `adminId` int(11) NOT NULL AUTO_INCREMENT,
  `adminName` varchar(45) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`adminId`),
  KEY `userId` (`userId`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (98,'admin1','99966333258','admin1','admin1@gmail.com',97);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `attendanceId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `memberId` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`attendanceId`),
  KEY `userId` (`userId`),
  KEY `memberId_idx` (`memberId`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `memberId` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (78,1,77,'2021-12-12'),(79,1,77,'2021-12-12'),(82,1,81,'2021-12-12'),(87,1,81,'2021-12-12'),(88,1,77,'2021-12-12'),(89,1,77,'2021-12-12'),(90,1,77,'2021-12-12'),(91,1,77,'2021-12-12'),(92,84,86,'2021-12-12');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branchmaster`
--

DROP TABLE IF EXISTS `branchmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branchmaster` (
  `branchId` int(11) NOT NULL AUTO_INCREMENT,
  `branchName` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`branchId`),
  KEY `branch_user_id_idx` (`userId`),
  CONSTRAINT `branch_user_id` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branchmaster`
--

LOCK TABLES `branchmaster` WRITE;
/*!40000 ALTER TABLE `branchmaster` DISABLE KEYS */;
INSERT INTO `branchmaster` VALUES (1,'East_Wall_Road','Dublin 3','0898745632',1);
/*!40000 ALTER TABLE `branchmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (103);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor` (
  `instructorId` int(11) NOT NULL AUTO_INCREMENT,
  `instructorName` varchar(45) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`instructorId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES (85,'inst1','9999995984','inst1','inst1@gmail.com',84),(102,'Insttt','9996666587','InstttInstttInsttt','Insttt@gmail.com',101);
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `memberId` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `joiningDate` date DEFAULT NULL,
  `endOfMembershipDate` date DEFAULT NULL,
  `membershipId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `branchId` int(11) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  PRIMARY KEY (`memberId`),
  KEY `userId` (`userId`),
  KEY `membershipId` (`membershipId`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `member_ibfk_2` FOREIGN KEY (`membershipId`) REFERENCES `membershiptype` (`membershipId`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (77,'Mukesh','Sharma','A/503, Ostwal Onyx, Jesal Park','9930969063','mukeshsharma31994@gmail.com',25,'Male','2021-12-12',NULL,3,1,0,'2021-12-19'),(80,'test1','test1','gdgh','999999999','test1@gmail.com',28,'Female','2021-12-12',NULL,1,1,0,'2021-12-19'),(81,'test5','test5','A/503, Ostwal Onyx, Jesal Park','9999999990','test5@gmail.com',28,'Male','2021-12-12',NULL,1,1,0,'2021-12-26'),(86,'Mukeshinst1','Sharma','A/503, Ostwal Onyx, Jesal Park','9930969063','mukeshsharma31994@gmail.com',29,'Male','2021-12-12',NULL,1,84,0,'2021-12-18'),(99,'test7','test7','test7test7test7test7','99999964','test7@gmail.com',22,'Male','2021-12-12',NULL,1,84,1,'2021-12-23'),(100,'admin11','admin111','admin1admin1','9988754925','admin1@gmail.com',22,'Female','2021-12-12',NULL,1,97,1,'1111-11-11');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membershiptype`
--

DROP TABLE IF EXISTS `membershiptype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membershiptype` (
  `membershipId` int(11) NOT NULL AUTO_INCREMENT,
  `membershipName` varchar(15) NOT NULL,
  `membershipPeriod` varchar(15) NOT NULL,
  `membershipAmount` float NOT NULL,
  `signupFee` float DEFAULT '0',
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`membershipId`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membershiptype`
--

LOCK TABLES `membershiptype` WRITE;
/*!40000 ALTER TABLE `membershiptype` DISABLE KEYS */;
INSERT INTO `membershiptype` VALUES (1,'Monthly','30',50,0,1),(2,'Quarterly','90',120,0,1),(3,'Yearly','365',400,0,1);
/*!40000 ALTER TABLE `membershiptype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `paymentId` int(11) NOT NULL AUTO_INCREMENT,
  `memberId` int(11) DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `paymentTime` datetime DEFAULT NULL,
  `paymentDate` date DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`paymentId`),
  KEY `userId` (`userId`),
  KEY `memberId` (`memberId`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (83,81,'500','2021-12-12 02:41:32','2021-12-12',1),(93,77,'500','2021-12-12 02:56:41','2021-12-12',84);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotional`
--

DROP TABLE IF EXISTS `promotional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotional` (
  `promotion_id` int(11) NOT NULL AUTO_INCREMENT,
  `promotion_name` varchar(45) DEFAULT NULL,
  `file_upload` blob,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`promotion_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotional`
--

LOCK TABLES `promotional` WRITE;
/*!40000 ALTER TABLE `promotional` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `roles` varchar(45) DEFAULT NULL,
  `branchId` int(11) DEFAULT NULL,
  `createdTime` timestamp NULL DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `userId` (`userId`),
  KEY `branchId_idx` (`branchId`),
  CONSTRAINT `branchId` FOREIGN KEY (`branchId`) REFERENCES `branchmaster` (`branchId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'mukesh','mukesh','ADMIN',1,'2021-12-12 02:45:59',1),(84,'inst1','inst1','INSTRUCTOR',1,'2021-12-12 02:45:59',1),(97,'admin1','admin1','ADMIN',1,'2021-12-12 03:14:27',1),(101,'Insttt','Insttt','INSTRUCTOR',1,'2021-12-12 03:35:41',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout`
--

DROP TABLE IF EXISTS `workout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workout` (
  `workoutId` int(11) NOT NULL AUTO_INCREMENT,
  `workoutName` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `createdDate` timestamp NULL DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`workoutId`),
  KEY `userId` (`userId`),
  CONSTRAINT `workout_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout`
--

LOCK TABLES `workout` WRITE;
/*!40000 ALTER TABLE `workout` DISABLE KEYS */;
INSERT INTO `workout` VALUES (95,'leg','leg workout','2021-12-12 03:13:02',84);
/*!40000 ALTER TABLE `workout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workoutplan`
--

DROP TABLE IF EXISTS `workoutplan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workoutplan` (
  `planId` int(11) NOT NULL,
  `memberId` int(11) DEFAULT NULL,
  `workoutId` int(11) DEFAULT NULL,
  `workoutTime` timestamp NULL DEFAULT NULL,
  `workoutDate` date DEFAULT NULL,
  `instructorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`planId`),
  KEY `memberId` (`memberId`),
  KEY `workoutId` (`workoutId`),
  KEY `instructorId` (`instructorId`),
  CONSTRAINT `workoutplan_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  CONSTRAINT `workoutplan_ibfk_2` FOREIGN KEY (`workoutId`) REFERENCES `workout` (`workoutId`),
  CONSTRAINT `workoutplan_ibfk_3` FOREIGN KEY (`instructorId`) REFERENCES `instructor` (`instructorId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workoutplan`
--

LOCK TABLES `workoutplan` WRITE;
/*!40000 ALTER TABLE `workoutplan` DISABLE KEYS */;
INSERT INTO `workoutplan` VALUES (96,77,95,'2021-12-12 03:13:42','2021-12-19',85);
/*!40000 ALTER TABLE `workoutplan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-12  3:50:30
