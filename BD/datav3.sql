CREATE DATABASE  IF NOT EXISTS `kletadb`  DEFAULT CHARACTER SET utf8mb4;
USE `kletadb`;


DROP TABLE IF EXISTS `sizes`;

CREATE TABLE `sizes` (
  `idSize` int NOT NULL AUTO_INCREMENT,
  `size` varchar(45) NOT NULL,
  PRIMARY KEY (`idSize`),
  UNIQUE KEY `idSize_UNIQUE` (`idSize`),
  UNIQUE KEY `size_UNIQUE` (`size`)
);


INSERT INTO `sizes` (`idSize`, `size`) VALUES (1,'20'),(2,'26'),(3,'29');

DROP TABLE IF EXISTS `usertypes`;

CREATE TABLE `usertypes` (
  `idUserType` int NOT NULL AUTO_INCREMENT,
  `userType` varchar(45) NOT NULL,
  PRIMARY KEY (`idUserType`),
  UNIQUE KEY `idUserType_UNIQUE` (`idUserType`),
  UNIQUE KEY `userType_UNIQUE` (`userType`)
) ;

INSERT INTO `usertypes` (`idUserType`, `userType`) VALUES (1,'admin'),(2,'user');

DROP TABLE IF EXISTS `users`;

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
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `user_UNIQUE` (`user`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `101_idx` (`idUserTypeFK`),
  CONSTRAINT `4` FOREIGN KEY (`idUserTypeFK`) REFERENCES `usertypes` (`idUserType`)
);


INSERT INTO `users` (`idUser`, `fullname`, `addres`, `email`, `birthday`, `user`, `key`, `idUserTypeFK`, `userImage`, `createdAt`, `updatedAt`) VALUES (4,'rama','1234562134432','rama@rama.com','1995-07-04','rama','$2a$10$gb3GBi/FmdKR1nkKLPhRXu2VOM6mB2mzFrEwqpGxmjtg09h2e4/3q',1,'porDefecto.jpg','2022-07-02','2022-07-02'),(5,'Luis','1187444','luis@luis.com','1990-11-27','luis','$2a$10$Ftd5/GQbIriJ2sVdZ8pAbOZRBSd2WzZT3NZNTkC3WRZYU/TxsFIPy',1,'1656815679618_img_.png','2022-07-02','2022-07-02'),(6,'Diana','789123','daiana@daiana.com','1990-10-10','daiana','$2a$10$5M4tOVldqF1XF8e63VYvLeR77cRJ/HNFE9kZhXpSIM.equKZ1yt56',1,'1656887344037_img_.jpg','2022-07-03','2022-07-03'),(7,'jorge','113','jorge@gmail.com','2018-02-06','2132','$2a$10$B/kb01ICdHkJ0gw8nl2PeuRK9EGXqeo4XguUblH0c.jnwCahUCPze',1,'porDefecto.jpg','2022-07-06','2022-07-06'),(8,'guest','calle 123','guest@gmail.com','1999-06-27','guest','$2a$10$1SZll4w8hFB1PjH3NCqQI.Uj62AgPgYDh2ipRO/nk71Y1.WRGjYsa',2,'porDefecto.jpg','2022-07-09','2022-07-09');


DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `idCategory` int NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`idCategory`),
  UNIQUE KEY `idCateory_UNIQUE` (`idCategory`),
  UNIQUE KEY `category_UNIQUE` (`category`)
);


INSERT INTO `categories` (`idCategory`, `category`) VALUES (3,'discount'),(2,'new'),(1,'visited');

DROP TABLE IF EXISTS `colors`;

CREATE TABLE `colors` (
  `idColor` int NOT NULL AUTO_INCREMENT,
  `color` varchar(45) NOT NULL,
  PRIMARY KEY (`idColor`),
  UNIQUE KEY `color_UNIQUE` (`color`),
  UNIQUE KEY `idColor_UNIQUE` (`idColor`)
);


INSERT INTO `colors` (`idColor`, `color`) VALUES (3,'black'),(2,'red'),(1,'white');


DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `idProduct` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `descriptionLong` varchar(200) DEFAULT NULL,
  `stock` int NOT NULL,
  `price` float NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`idProduct`),
  UNIQUE KEY `idUsuarios_UNIQUE` (`idProduct`)
);

INSERT INTO `products` (`idProduct`, `title`, `description`, `descriptionLong`, `stock`, `price`, `createdAt`, `updatedAt`) VALUES (5,'Bicicleta Urbana','Modelo Kleta Urbana.\r\n','Modelo Kleta Urbana.\r\n',10,15000,'2022-07-19','2022-07-19'),(6,'Bicicleta Aurorita Plegable',' Modelo Aurorita Paseo',' Modelo Aurorita Paseo',15,13000,'2022-07-19','2022-07-19'),(7,'Bicicleta TopMega','Modelo MTB. La imagen es ilustrativa.','Modelo MTB. La imagen es ilustrativa.',20,22000,'2022-07-19','2022-07-19'),(8,'Bicicleta SLP Plegable','Modelo Plegable.  ','Modelo Plegable.  ',5,13989,'2022-07-19','2022-07-19'),(9,'Bicicleta Orbea MTB','Los colores pueden variar. ','Los colores pueden variar. ',20,19999,'2022-07-19','2022-07-19'),(10,'Bicicleta Silverfox MTB','Modelo MTB ','Modelo MTB ',12,15989,'2022-07-19','2022-07-19'),(11,'Bicicleta Raleigh Urbana','Los colores pueden variar. ','Los colores pueden variar. ',20,12999,'2022-07-19','2022-07-19'),(12,'Bicicleta Venzo MTB','Los colores pueden variar. ','Los colores pueden variar. ',20,27999,'2022-07-19','2022-07-19'),(13,'Bicicleta Venzo MTB','Los colores pueden variar ','Los colores pueden variar ',30,27999,'2022-07-19','2022-07-19'),(14,'Bici Electrica Randers Plegable','Bici Electrica ','Bici Electrica ',5,57999,'2022-07-19','2022-07-19'),(15,'Bici Electrica Tomaselli',' Bici Electrica',' Bici Electrica',5,89400,'2022-07-19','2022-07-19'),(16,'Bici Electrica Plegable GoLite',' Bici Electrica. Los colores pueden variar.',' Bici Electrica. Los colores pueden variar.',5,49699,'2022-07-19','2022-07-19');


DROP TABLE IF EXISTS `imageproducts`;

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
) ;

INSERT INTO `imageproducts` (`idImageProduct`, `idProductsFK`, `imageProduct`, `updatedAt`, `createdAt`) VALUES (5,5,'1658277519924_img_.webp','2022-07-19','2022-07-19'),(6,6,'1658277731909_img_.png','2022-07-19','2022-07-19'),(7,7,'1658277844327_img_.png','2022-07-19','2022-07-19'),(8,8,'1658277974375_img_.png','2022-07-19','2022-07-19'),(9,9,'1658278074910_img_.jpg','2022-07-19','2022-07-19'),(10,10,'1658278499411_img_.png','2022-07-19','2022-07-19'),(11,11,'1658278536487_img_.png','2022-07-19','2022-07-19'),(12,12,'1658278576273_img_.png','2022-07-19','2022-07-19'),(13,13,'1658278651861_img_.png','2022-07-19','2022-07-19'),(14,14,'1658278914074_img_.png','2022-07-19','2022-07-19'),(15,15,'1658278952635_img_.png','2022-07-19','2022-07-19'),(16,16,'1658278997119_img_.png','2022-07-19','2022-07-19');


DROP TABLE IF EXISTS `sizeproducts`;

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
);

INSERT INTO `sizeproducts` (`idSizeProduct`, `idSizeFK`, `idProductsFK`) VALUES (86,2,5),(87,3,5),(88,1,6),(89,2,7),(90,3,7),(92,1,8),(93,3,9),(94,2,9),(95,2,10),(96,3,10),(97,2,11),(98,2,12),(99,3,12),(100,2,13),(101,3,13),(102,2,14),(103,1,14),(104,3,15),(105,2,15),(106,1,16);



DROP TABLE IF EXISTS `categoryproducts`;

CREATE TABLE `categoryproducts` (
  `idCategoryProducts` int NOT NULL AUTO_INCREMENT,
  `idProductsFK` int NOT NULL,
  `idCategoryFK` int NOT NULL,
  PRIMARY KEY (`idCategoryProducts`),
  UNIQUE KEY `idCategoryProducts_UNIQUE` (`idCategoryProducts`),
  KEY `idProductosFK_idx` (`idProductsFK`),
  KEY `idCategoryFK_idx` (`idCategoryFK`),
  CONSTRAINT `13` FOREIGN KEY (`idProductsFK`) REFERENCES `products` (`idProduct`),
  CONSTRAINT `14` FOREIGN KEY (`idCategoryFK`) REFERENCES `categories` (`idCategory`)
);


LOCK TABLES `categoryproducts` WRITE;
INSERT INTO `categoryproducts` (`idCategoryProducts`, `idProductsFK`, `idCategoryFK`) VALUES (9,5,1),(10,5,2),(11,6,1),(12,6,2),(13,7,1),(14,7,2),(15,8,2),(16,8,1),(17,9,1),(18,9,2),(19,10,1),(20,10,2),(21,11,1),(22,11,2),(23,12,1),(24,12,2),(25,13,1),(26,13,2),(27,14,1),(28,14,3),(29,15,1),(30,15,3),(31,16,3),(32,16,1);
UNLOCK TABLES;

DROP TABLE IF EXISTS `colorproducts`;

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
);


INSERT INTO `colorproducts` (`idcolorProduct`, `idColorFK`, `idProductsFK`) VALUES (84,2,5),(85,1,5),(86,3,6),(87,2,6),(88,2,7),(89,3,7),(91,1,8),(92,3,9),(93,1,10),(94,1,11),(95,2,12),(96,3,13),(97,3,14),(98,2,15),(99,2,16);


DROP TABLE IF EXISTS `avatars`;

CREATE TABLE `avatars` (
  `idAvatar` int NOT NULL AUTO_INCREMENT,
  `avatar` varchar(45) NOT NULL,
  `idUserFK` int NOT NULL,
  `createAt` date DEFAULT NULL,
  `updateAt` date DEFAULT NULL,
  PRIMARY KEY (`idAvatar`),
  UNIQUE KEY `idUsuarios_UNIQUE` (`idUserFK`),
  UNIQUE KEY `userImage_UNIQUE` (`avatar`),
  UNIQUE KEY `idImage_UNIQUE` (`idAvatar`),
  CONSTRAINT `1` FOREIGN KEY (`idUserFK`) REFERENCES `users` (`idUser`)
) ;
;



DROP TABLE IF EXISTS `baskets`;

CREATE TABLE `baskets` (
  `idBasket` int NOT NULL AUTO_INCREMENT,
  `idProductFK` int NOT NULL,
  `amount` int NOT NULL,
  `idColorProductFK` int NOT NULL,
  `idUserFK` int NOT NULL,
  `idSizeProductFK` int NOT NULL,
  `updatedAt` date DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
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
);

