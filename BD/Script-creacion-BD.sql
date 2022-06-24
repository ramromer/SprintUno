-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema kletaDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kletaDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kletaDB` DEFAULT CHARACTER SET utf8 ;
USE `kletaDB` ;

-- -----------------------------------------------------
-- Table `kletaDB`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`users` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(45) NOT NULL,
  `addres` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `birthday` DATE NULL,
  `user` VARCHAR(45) NOT NULL,
  `key` VARCHAR(45) NOT NULL,
  `userImage` VARCHAR(45) NOT NULL,
  `createdAt` DATE NOT NULL,
  `updatedAt` DATE NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `user_UNIQUE` (`user` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kletaDB`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`products` (
  `idProduct` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `descriptionLong` VARCHAR(45) NULL,
  `stock` INT NOT NULL,
  `price` FLOAT NOT NULL,
  `productscol` VARCHAR(45) NULL,
  PRIMARY KEY (`idProduct`),
  UNIQUE INDEX `idUsuarios_UNIQUE` (`idProduct` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kletaDB`.`color`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`color` (
  `idColor` INT NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idColor`),
  UNIQUE INDEX `color_UNIQUE` (`color` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kletaDB`.`colorProduct`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`colorProduct` (
  `idcolorProduct` INT NOT NULL AUTO_INCREMENT,
  `idColorFK` INT NOT NULL,
  `idProductsFK` INT NOT NULL,
  PRIMARY KEY (`idcolorProduct`),
  UNIQUE INDEX `idcolorProduct_UNIQUE` (`idcolorProduct` ASC) VISIBLE,
  INDEX `idColorFK_idx` (`idColorFK` ASC) VISIBLE,
  INDEX `idProductsFK_idx` (`idProductsFK` ASC) VISIBLE,
  CONSTRAINT `11`
    FOREIGN KEY (`idColorFK`)
    REFERENCES `kletaDB`.`color` (`idColor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `12`
    FOREIGN KEY (`idProductsFK`)
    REFERENCES `kletaDB`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kletaDB`.`size`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`size` (
  `idSize` INT NOT NULL AUTO_INCREMENT,
  `size` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idSize`),
  UNIQUE INDEX `idSize_UNIQUE` (`idSize` ASC) VISIBLE,
  UNIQUE INDEX `size_UNIQUE` (`size` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kletaDB`.`sizeProduct`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`sizeProduct` (
  `idSizeProduct` INT NOT NULL AUTO_INCREMENT,
  `idSizeFK` INT NOT NULL,
  `idProductsFK` INT NOT NULL,
  PRIMARY KEY (`idSizeProduct`),
  UNIQUE INDEX `idSizeProduct_UNIQUE` (`idSizeProduct` ASC) VISIBLE,
  INDEX `idSizeFK_idx` (`idSizeFK` ASC) VISIBLE,
  INDEX `idProductsFK_idx` (`idProductsFK` ASC) VISIBLE,
  CONSTRAINT `7`
    FOREIGN KEY (`idSizeFK`)
    REFERENCES `kletaDB`.`size` (`idSize`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `8`
    FOREIGN KEY (`idProductsFK`)
    REFERENCES `kletaDB`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kletaDB`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`category` (
  `idCategory` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategory`),
  UNIQUE INDEX `idCateory_UNIQUE` (`idCategory` ASC) VISIBLE,
  UNIQUE INDEX `category_UNIQUE` (`category` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kletaDB`.`categoryProducts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`categoryProducts` (
  `idCategoryProducts` INT NOT NULL AUTO_INCREMENT,
  `idProductsFK` INT NOT NULL,
  `idCategoryFK` INT NOT NULL,
  PRIMARY KEY (`idCategoryProducts`),
  UNIQUE INDEX `idCategoryProducts_UNIQUE` (`idCategoryProducts` ASC) VISIBLE,
  INDEX `idProductosFK_idx` (`idProductsFK` ASC) VISIBLE,
  INDEX `idCategoryFK_idx` (`idCategoryFK` ASC) VISIBLE,
  CONSTRAINT `13`
    FOREIGN KEY (`idProductsFK`)
    REFERENCES `kletaDB`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `14`
    FOREIGN KEY (`idCategoryFK`)
    REFERENCES `kletaDB`.`category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kletaDB`.`avatar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`avatar` (
  `idAvatar` INT NOT NULL AUTO_INCREMENT,
  `avatar` VARCHAR(45) NOT NULL,
  `idUsuarios` INT NOT NULL,
  PRIMARY KEY (`idAvatar`),
  UNIQUE INDEX `idUsuarios_UNIQUE` (`idUsuarios` ASC) VISIBLE,
  UNIQUE INDEX `userImage_UNIQUE` (`avatar` ASC) VISIBLE,
  UNIQUE INDEX `idImage_UNIQUE` (`idAvatar` ASC) VISIBLE,
  CONSTRAINT `1`
    FOREIGN KEY (`idUsuarios`)
    REFERENCES `kletaDB`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kletaDB`.`imageProduct`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`imageProduct` (
  `idImageProduct` INT NOT NULL AUTO_INCREMENT,
  `idProductsFK` INT NOT NULL,
  `imageProduct` INT NOT NULL,
  PRIMARY KEY (`idImageProduct`),
  UNIQUE INDEX `idImageProduct_UNIQUE` (`idImageProduct` ASC) VISIBLE,
  UNIQUE INDEX `imageProduct_UNIQUE` (`imageProduct` ASC) VISIBLE,
  INDEX `idProductFK_idx` (`idProductsFK` ASC) VISIBLE,
  CONSTRAINT `15`
    FOREIGN KEY (`idProductsFK`)
    REFERENCES `kletaDB`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kletaDB`.`type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`type` (
  `idType` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idType`),
  UNIQUE INDEX `type_UNIQUE` (`type` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kletaDB`.`userType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`userType` (
  `idUserType` INT NOT NULL AUTO_INCREMENT,
  `idTypeFK` INT NOT NULL,
  `idUserFK` INT NOT NULL,
  PRIMARY KEY (`idUserType`),
  UNIQUE INDEX `idUserType_UNIQUE` (`idUserType` ASC) VISIBLE,
  INDEX `idTypeFK_idx` (`idTypeFK` ASC) VISIBLE,
  INDEX `idUserFK_idx` (`idUserFK` ASC) VISIBLE,
  CONSTRAINT `3`
    FOREIGN KEY (`idTypeFK`)
    REFERENCES `kletaDB`.`type` (`idType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `4`
    FOREIGN KEY (`idUserFK`)
    REFERENCES `kletaDB`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kletaDB`.`basket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`basket` (
  `idBasket` INT NOT NULL AUTO_INCREMENT,
  `idProductFK` INT NOT NULL,
  `amount` INT NOT NULL,
  `idColorProductFK` INT NOT NULL,
  PRIMARY KEY (`idBasket`),
  UNIQUE INDEX `idBasket_UNIQUE` (`idBasket` ASC) VISIBLE,
  INDEX `idProductFK_idx` (`idProductFK` ASC) VISIBLE,
  INDEX `idColorProductFK_idx` (`idColorProductFK` ASC) VISIBLE,
  CONSTRAINT `9`
    FOREIGN KEY (`idProductFK`)
    REFERENCES `kletaDB`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `10`
    FOREIGN KEY (`idColorProductFK`)
    REFERENCES `kletaDB`.`colorProduct` (`idcolorProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kletaDB`.`userBasket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kletaDB`.`userBasket` (
  `idUserBasket` INT NOT NULL AUTO_INCREMENT,
  `idBasketFK` INT NOT NULL,
  `idUsuariosFK` INT NOT NULL,
  PRIMARY KEY (`idUserBasket`),
  UNIQUE INDEX `idUserBasket_UNIQUE` (`idUserBasket` ASC) VISIBLE,
  INDEX `idBasketFK_idx` (`idBasketFK` ASC) VISIBLE,
  INDEX `idUsuarios_idx` (`idUsuariosFK` ASC) VISIBLE,
  CONSTRAINT `5`
    FOREIGN KEY (`idBasketFK`)
    REFERENCES `kletaDB`.`basket` (`idBasket`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `6`
    FOREIGN KEY (`idUsuariosFK`)
    REFERENCES `kletaDB`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
