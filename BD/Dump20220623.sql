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
-- Table structure for table `avatar`
--

DROP TABLE IF EXISTS `avatar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatar` (
  `idAvatar` int NOT NULL AUTO_INCREMENT,
  `avatar` varchar(45) NOT NULL,
  `idUsuarios` int NOT NULL,
  PRIMARY KEY (`idAvatar`),
  UNIQUE KEY `idUsuarios_UNIQUE` (`idUsuarios`),
  UNIQUE KEY `userImage_UNIQUE` (`avatar`),
  UNIQUE KEY `idImage_UNIQUE` (`idAvatar`),
  CONSTRAINT `usersFK` FOREIGN KEY (`idUsuarios`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatar`
--

LOCK TABLES `avatar` WRITE;
/*!40000 ALTER TABLE `avatar` DISABLE KEYS */;
/*!40000 ALTER TABLE `avatar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basket`
--

DROP TABLE IF EXISTS `basket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basket` (
  `idBasket` int NOT NULL AUTO_INCREMENT,
  `idProductFK` int NOT NULL,
  `amount` int NOT NULL,
  `idColorProductFK` int NOT NULL,
  PRIMARY KEY (`idBasket`),
  UNIQUE KEY `idBasket_UNIQUE` (`idBasket`),
  KEY `idProductFK_idx` (`idProductFK`),
  KEY `idColorProductFK_idx` (`idColorProductFK`),
  CONSTRAINT `10` FOREIGN KEY (`idColorProductFK`) REFERENCES `colorproduct` (`idcolorProduct`),
  CONSTRAINT `9` FOREIGN KEY (`idProductFK`) REFERENCES `products` (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `idCategory` int NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`idCategory`),
  UNIQUE KEY `idCateory_UNIQUE` (`idCategory`),
  UNIQUE KEY `category_UNIQUE` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
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
  CONSTRAINT `categoryFK` FOREIGN KEY (`idCategoryFK`) REFERENCES `category` (`idCategory`),
  CONSTRAINT `productsFK` FOREIGN KEY (`idProductsFK`) REFERENCES `products` (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoryproducts`
--

LOCK TABLES `categoryproducts` WRITE;
/*!40000 ALTER TABLE `categoryproducts` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoryproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `idColor` int NOT NULL,
  `color` varchar(45) NOT NULL,
  PRIMARY KEY (`idColor`),
  UNIQUE KEY `color_UNIQUE` (`color`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colorproduct`
--

DROP TABLE IF EXISTS `colorproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colorproduct` (
  `idcolorProduct` int NOT NULL AUTO_INCREMENT,
  `idColorFK` int NOT NULL,
  `idProductsFK` int NOT NULL,
  PRIMARY KEY (`idcolorProduct`),
  UNIQUE KEY `idcolorProduct_UNIQUE` (`idcolorProduct`),
  KEY `idColorFK_idx` (`idColorFK`),
  KEY `idProductsFK_idx` (`idProductsFK`),
  CONSTRAINT `idColorFK` FOREIGN KEY (`idColorFK`) REFERENCES `color` (`idColor`),
  CONSTRAINT `idProductsFK` FOREIGN KEY (`idProductsFK`) REFERENCES `products` (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colorproduct`
--

LOCK TABLES `colorproduct` WRITE;
/*!40000 ALTER TABLE `colorproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `colorproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imageproduct`
--

DROP TABLE IF EXISTS `imageproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imageproduct` (
  `idImageProduct` int NOT NULL AUTO_INCREMENT,
  `idProductsFK` int NOT NULL,
  `imageProduct` int NOT NULL,
  PRIMARY KEY (`idImageProduct`),
  UNIQUE KEY `idImageProduct_UNIQUE` (`idImageProduct`),
  UNIQUE KEY `imageProduct_UNIQUE` (`imageProduct`),
  KEY `idProductFK_idx` (`idProductsFK`),
  CONSTRAINT `` FOREIGN KEY (`idProductsFK`) REFERENCES `products` (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imageproduct`
--

LOCK TABLES `imageproduct` WRITE;
/*!40000 ALTER TABLE `imageproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `imageproduct` ENABLE KEYS */;
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
  `productscol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idProduct`),
  UNIQUE KEY `idUsuarios_UNIQUE` (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `idSize` int NOT NULL AUTO_INCREMENT,
  `size` varchar(45) NOT NULL,
  PRIMARY KEY (`idSize`),
  UNIQUE KEY `idSize_UNIQUE` (`idSize`),
  UNIQUE KEY `size_UNIQUE` (`size`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizeproduct`
--

DROP TABLE IF EXISTS `sizeproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizeproduct` (
  `idSizeProduct` int NOT NULL AUTO_INCREMENT,
  `idSizeFK` int NOT NULL,
  `idProductsFK` int NOT NULL,
  PRIMARY KEY (`idSizeProduct`),
  UNIQUE KEY `idSizeProduct_UNIQUE` (`idSizeProduct`),
  KEY `idSizeFK_idx` (`idSizeFK`),
  KEY `idProductsFK_idx` (`idProductsFK`),
  CONSTRAINT `idProductFK` FOREIGN KEY (`idProductsFK`) REFERENCES `products` (`idProduct`),
  CONSTRAINT `idSizeFK` FOREIGN KEY (`idSizeFK`) REFERENCES `size` (`idSize`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizeproduct`
--

LOCK TABLES `sizeproduct` WRITE;
/*!40000 ALTER TABLE `sizeproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `sizeproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `idType` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`idType`),
  UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userbasket`
--

DROP TABLE IF EXISTS `userbasket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userbasket` (
  `idUserBasket` int NOT NULL AUTO_INCREMENT,
  `idBasketFK` int NOT NULL,
  `idUsuariosFK` int NOT NULL,
  PRIMARY KEY (`idUserBasket`),
  UNIQUE KEY `idUserBasket_UNIQUE` (`idUserBasket`),
  KEY `idBasketFK_idx` (`idBasketFK`),
  KEY `idUsuarios_idx` (`idUsuariosFK`),
  CONSTRAINT `5` FOREIGN KEY (`idBasketFK`) REFERENCES `basket` (`idBasket`),
  CONSTRAINT `6` FOREIGN KEY (`idUsuariosFK`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userbasket`
--

LOCK TABLES `userbasket` WRITE;
/*!40000 ALTER TABLE `userbasket` DISABLE KEYS */;
/*!40000 ALTER TABLE `userbasket` ENABLE KEYS */;
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
  `key` varchar(45) NOT NULL,
  `userImage` varchar(45) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `user_UNIQUE` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertype` (
  `idUserType` int NOT NULL AUTO_INCREMENT,
  `idTypeFK` int NOT NULL,
  `idUserFK` int NOT NULL,
  PRIMARY KEY (`idUserType`),
  UNIQUE KEY `idUserType_UNIQUE` (`idUserType`),
  KEY `idTypeFK_idx` (`idTypeFK`),
  KEY `idUserFK_idx` (`idUserFK`),
  CONSTRAINT `3` FOREIGN KEY (`idTypeFK`) REFERENCES `type` (`idType`),
  CONSTRAINT `4` FOREIGN KEY (`idUserFK`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertype`
--

LOCK TABLES `usertype` WRITE;
/*!40000 ALTER TABLE `usertype` DISABLE KEYS */;
/*!40000 ALTER TABLE `usertype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-23 19:13:53
