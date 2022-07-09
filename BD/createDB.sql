CREATE DATABASE  IF NOT EXISTS `kletadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `kletadb`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: kletadb
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `avatars`
--

DROP TABLE IF EXISTS `avatars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatars` (
  `idAvatar` int NOT NULL AUTO_INCREMENT,
  `avatar` varchar(45) NOT NULL,
  `idUsuariosFK` int NOT NULL,
  `createAt` date DEFAULT NULL,
  `updateAt` date DEFAULT NULL,
  PRIMARY KEY (`idAvatar`),
  UNIQUE KEY `idUsuarios_UNIQUE` (`idUsuariosFK`),
  UNIQUE KEY `userImage_UNIQUE` (`avatar`),
  UNIQUE KEY `idImage_UNIQUE` (`idAvatar`),
  CONSTRAINT `1` FOREIGN KEY (`idUsuariosFK`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatars`
--
-- ORDER BY:  `idAvatar`

LOCK TABLES `avatars` WRITE;
/*!40000 ALTER TABLE `avatars` DISABLE KEYS */;
/*!40000 ALTER TABLE `avatars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baskets`
--

DROP TABLE IF EXISTS `baskets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baskets` (
  `idBasket` int NOT NULL AUTO_INCREMENT,
  `idProductFK` int NOT NULL,
  `amount` int NOT NULL,
  `idColorProductFK` int NOT NULL,
  `idUserFK` int NOT NULL,
  `idSizeProductFK` int NOT NULL,
  PRIMARY KEY (`idBasket`),
  UNIQUE KEY `idBasket_UNIQUE` (`idBasket`),
  KEY `idProductFK_idx` (`idProductFK`),
  KEY `idColorProductFK_idx` (`idColorProductFK`),
  KEY `100_idx` (`idSizeProductFK`),
  KEY `104_idx` (`idUserFK`),
  CONSTRAINT `10` FOREIGN KEY (`idColorProductFK`) REFERENCES `colorproducts` (`idcolorProduct`),
  CONSTRAINT `100` FOREIGN KEY (`idSizeProductFK`) REFERENCES `sizeproducts` (`idSizeProduct`),
  CONSTRAINT `104` FOREIGN KEY (`idUserFK`) REFERENCES `users` (`idUser`),
  CONSTRAINT `9` FOREIGN KEY (`idProductFK`) REFERENCES `products` (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baskets`
--
-- ORDER BY:  `idBasket`

LOCK TABLES `baskets` WRITE;
/*!40000 ALTER TABLE `baskets` DISABLE KEYS */;
/*!40000 ALTER TABLE `baskets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoryproducts`
--

DROP TABLE IF EXISTS `categoryproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoryproducts` (
  `idCategoryProducts` int NOT NULL AUTO_INCREMENT,
  `idProductsFK` int NOT NULL,
  `idCategoryFK` int NOT NULL,
  PRIMARY KEY (`idCategoryProducts`),
  UNIQUE KEY `idCategoryProducts_UNIQUE` (`idCategoryProducts`),
  KEY `idProductosFK_idx` (`idProductsFK`),
  KEY `idCategoryFK_idx` (`idCategoryFK`),
  CONSTRAINT `13` FOREIGN KEY (`idProductsFK`) REFERENCES `products` (`idProduct`),
  CONSTRAINT `14` FOREIGN KEY (`idCategoryFK`) REFERENCES `categorys` (`idCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoryproducts`
--
-- ORDER BY:  `idCategoryProducts`

LOCK TABLES `categoryproducts` WRITE;
/*!40000 ALTER TABLE `categoryproducts` DISABLE KEYS */;
INSERT INTO `categoryproducts` (`idCategoryProducts`, `idProductsFK`, `idCategoryFK`) VALUES (11,19,1),(12,19,2),(13,20,1),(14,20,2),(15,21,1),(16,21,2),(17,22,1),(18,22,2),(19,23,1),(20,23,2),(21,24,1),(22,24,2),(23,25,1),(24,25,2);
/*!40000 ALTER TABLE `categoryproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorys`
--

DROP TABLE IF EXISTS `categorys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorys` (
  `idCategory` int NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`idCategory`),
  UNIQUE KEY `idCateory_UNIQUE` (`idCategory`),
  UNIQUE KEY `category_UNIQUE` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorys`
--
-- ORDER BY:  `idCategory`

LOCK TABLES `categorys` WRITE;
/*!40000 ALTER TABLE `categorys` DISABLE KEYS */;
INSERT INTO `categorys` (`idCategory`, `category`) VALUES (1,'visited'),(2,'new');
/*!40000 ALTER TABLE `categorys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colorproducts`
--

DROP TABLE IF EXISTS `colorproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colorproducts` (
  `idcolorProduct` int NOT NULL AUTO_INCREMENT,
  `idColorFK` int NOT NULL,
  `idProductsFK` int NOT NULL,
  PRIMARY KEY (`idcolorProduct`),
  UNIQUE KEY `idcolorProduct_UNIQUE` (`idcolorProduct`),
  KEY `idColorFK_idx` (`idColorFK`),
  KEY `idProductsFK_idx` (`idProductsFK`),
  CONSTRAINT `11` FOREIGN KEY (`idColorFK`) REFERENCES `colors` (`idColor`),
  CONSTRAINT `12` FOREIGN KEY (`idProductsFK`) REFERENCES `products` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colorproducts`
--
-- ORDER BY:  `idcolorProduct`

LOCK TABLES `colorproducts` WRITE;
/*!40000 ALTER TABLE `colorproducts` DISABLE KEYS */;
INSERT INTO `colorproducts` (`idcolorProduct`, `idColorFK`, `idProductsFK`) VALUES (105,1,19),(106,1,20),(107,1,21),(108,1,22),(109,1,23),(110,1,24),(111,2,25),(112,3,25),(113,1,25);
/*!40000 ALTER TABLE `colorproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `idColor` int NOT NULL AUTO_INCREMENT,
  `color` varchar(45) NOT NULL,
  PRIMARY KEY (`idColor`),
  UNIQUE KEY `color_UNIQUE` (`color`),
  UNIQUE KEY `idColor_UNIQUE` (`idColor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--
-- ORDER BY:  `idColor`

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` (`idColor`, `color`) VALUES (1,'white'),(2,'red'),(3,'black');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imageproducts`
--

DROP TABLE IF EXISTS `imageproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imageproducts` (
  `idImageProduct` int NOT NULL AUTO_INCREMENT,
  `idProductsFK` int NOT NULL,
  `imageProduct` varchar(45) NOT NULL,
  `updatedAt` date DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  PRIMARY KEY (`idImageProduct`),
  UNIQUE KEY `idImageProduct_UNIQUE` (`idImageProduct`),
  UNIQUE KEY `imageProduct_UNIQUE` (`imageProduct`),
  KEY `idProductFK_idx` (`idProductsFK`),
  CONSTRAINT `15` FOREIGN KEY (`idProductsFK`) REFERENCES `products` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imageproducts`
--
-- ORDER BY:  `idImageProduct`

LOCK TABLES `imageproducts` WRITE;
/*!40000 ALTER TABLE `imageproducts` DISABLE KEYS */;
INSERT INTO `imageproducts` (`idImageProduct`, `idProductsFK`, `imageProduct`, `updatedAt`, `createdAt`) VALUES (16,19,'1657329780652_img_.webp','2022-07-08','2022-07-08'),(17,20,'1657329920770_img_.webp','2022-07-08','2022-07-08'),(18,21,'1657330101066_img_.webp','2022-07-08','2022-07-08'),(19,22,'1657330356681_img_.webp','2022-07-08','2022-07-08'),(20,23,'1657330418961_img_.webp','2022-07-08','2022-07-08'),(21,24,'1657330830156_img_.webp','2022-07-08','2022-07-08'),(22,25,'1657331179651_img_.webp','2022-07-08','2022-07-08');
/*!40000 ALTER TABLE `imageproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `idProduct` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `descriptionLong` varchar(45) DEFAULT NULL,
  `stock` int NOT NULL,
  `price` float NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`idProduct`),
  UNIQUE KEY `idUsuarios_UNIQUE` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--
-- ORDER BY:  `idProduct`

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`idProduct`, `title`, `description`, `descriptionLong`, `stock`, `price`, `createdAt`, `updatedAt`) VALUES (19,'prueba102','cien ','cien ',10,1200,'2022-07-08','2022-07-08'),(20,'prueba102','cien ','cien ',10,1200,'2022-07-08','2022-07-08'),(21,'prueba102','cien ','cien ',10,1200,'2022-07-08','2022-07-08'),(22,'prueba102','cien ','cien ',10,1200,'2022-07-08','2022-07-08'),(23,'123',' ',' ',12,123,'2022-07-08','2022-07-08'),(24,'prueba 300',' asdfas',' asdfas',2,300,'2022-07-08','2022-07-08'),(25,'123',' wsw',' wsw',2,2,'2022-07-08','2022-07-08');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizeproducts`
--

DROP TABLE IF EXISTS `sizeproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizeproducts` (
  `idSizeProduct` int NOT NULL AUTO_INCREMENT,
  `idSizeFK` int NOT NULL,
  `idProductsFK` int NOT NULL,
  PRIMARY KEY (`idSizeProduct`),
  UNIQUE KEY `idSizeProduct_UNIQUE` (`idSizeProduct`),
  KEY `idSizeFK_idx` (`idSizeFK`),
  KEY `idProductsFK_idx` (`idProductsFK`),
  CONSTRAINT `7` FOREIGN KEY (`idSizeFK`) REFERENCES `sizes` (`idSize`),
  CONSTRAINT `8` FOREIGN KEY (`idProductsFK`) REFERENCES `products` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizeproducts`
--
-- ORDER BY:  `idSizeProduct`

LOCK TABLES `sizeproducts` WRITE;
/*!40000 ALTER TABLE `sizeproducts` DISABLE KEYS */;
INSERT INTO `sizeproducts` (`idSizeProduct`, `idSizeFK`, `idProductsFK`) VALUES (32,2,24),(33,1,25),(34,2,25),(35,3,25);
/*!40000 ALTER TABLE `sizeproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `idSize` int NOT NULL AUTO_INCREMENT,
  `size` varchar(45) NOT NULL,
  PRIMARY KEY (`idSize`),
  UNIQUE KEY `idSize_UNIQUE` (`idSize`),
  UNIQUE KEY `size_UNIQUE` (`size`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--
-- ORDER BY:  `idSize`

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` (`idSize`, `size`) VALUES (1,'20'),(2,'26'),(3,'29');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(45) NOT NULL,
  `addres` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `birthday` date DEFAULT NULL,
  `user` varchar(45) NOT NULL,
  `key` varchar(100) NOT NULL,
  `idUserTypeFK` int NOT NULL,
  `userImage` varchar(45) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `user_UNIQUE` (`user`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `101_idx` (`idUserTypeFK`),
  CONSTRAINT `4` FOREIGN KEY (`idUserTypeFK`) REFERENCES `usertypes` (`idUserType`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--
-- ORDER BY:  `idUser`

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`idUser`, `fullname`, `addres`, `email`, `birthday`, `user`, `key`, `idUserTypeFK`, `userImage`, `createdAt`, `updatedAt`) VALUES (4,'rama','123456','rama@rama.com','1995-07-04','rama','$2a$10$c.fdKMvTscxzKFHdPLtZr.2p0kSmv7aPqbcsOavsnBWm1z9BBz5Ze',1,'porDefecto.jpg','2022-07-02','2022-07-02'),(5,'Luis','1187444','luis@luis.com','1990-11-27','luis','$2a$10$Ftd5/GQbIriJ2sVdZ8pAbOZRBSd2WzZT3NZNTkC3WRZYU/TxsFIPy',1,'1656815679618_img_.png','2022-07-02','2022-07-02'),(6,'Diana','789123','daiana@daiana.com','1990-10-10','daiana','$2a$10$5M4tOVldqF1XF8e63VYvLeR77cRJ/HNFE9kZhXpSIM.equKZ1yt56',1,'1656887344037_img_.jpg','2022-07-03','2022-07-03'),(7,'jorge','113','jorge@gmail.com','2018-02-06','2132','$2a$10$B/kb01ICdHkJ0gw8nl2PeuRK9EGXqeo4XguUblH0c.jnwCahUCPze',1,'porDefecto.jpg','2022-07-06','2022-07-06'),(8,'guest','calle 123','guest@gmail.com','1999-06-27','guest','$2a$10$1SZll4w8hFB1PjH3NCqQI.Uj62AgPgYDh2ipRO/nk71Y1.WRGjYsa',2,'porDefecto.jpg','2022-07-09','2022-07-09');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertypes`
--

DROP TABLE IF EXISTS `usertypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertypes` (
  `idUserType` int NOT NULL AUTO_INCREMENT,
  `userType` varchar(45) NOT NULL,
  PRIMARY KEY (`idUserType`),
  UNIQUE KEY `idUserType_UNIQUE` (`idUserType`),
  UNIQUE KEY `userType_UNIQUE` (`userType`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertypes`
--
-- ORDER BY:  `idUserType`

LOCK TABLES `usertypes` WRITE;
/*!40000 ALTER TABLE `usertypes` DISABLE KEYS */;
INSERT INTO `usertypes` (`idUserType`, `userType`) VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `usertypes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-09 13:04:40
