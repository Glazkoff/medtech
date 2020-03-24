-- MySQL Script generated by MySQL Workbench
-- Tue Mar 24 20:41:26 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`courses` ;

CREATE TABLE IF NOT EXISTS `mydb`.`courses` (
  `id_courses` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  PRIMARY KEY (`id_courses`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`divisions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`divisions` ;

CREATE TABLE IF NOT EXISTS `mydb`.`divisions` (
  `id_divisions` INT NOT NULL AUTO_INCREMENT,
  `id_courses` INT NOT NULL,
  `title` VARCHAR(45) NULL,
  PRIMARY KEY (`id_divisions`),
  CONSTRAINT `fk_divisions_courses`
    FOREIGN KEY (`id_courses`)
    REFERENCES `mydb`.`courses` (`id_courses`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_divisions_courses_idx` ON `mydb`.`divisions` (`id_courses` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`materials`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`materials` ;

CREATE TABLE IF NOT EXISTS `mydb`.`materials` (
  `id_materials` INT NOT NULL AUTO_INCREMENT,
  `id_divisions` INT NOT NULL,
  `duration` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `title` VARCHAR(45) GENERATED ALWAYS AS () VIRTUAL,
  PRIMARY KEY (`id_materials`),
  CONSTRAINT `fk_materials_divisions1`
    FOREIGN KEY (`id_divisions`)
    REFERENCES `mydb`.`divisions` (`id_divisions`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_materials_divisions1_idx` ON `mydb`.`materials` (`id_divisions` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`news`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`news` ;

CREATE TABLE IF NOT EXISTS `mydb`.`news` (
  `id_news` VARCHAR(45) NOT NULL,
  `id_materials` INT NOT NULL,
  PRIMARY KEY (`id_news`),
  CONSTRAINT `fk_news_materials1`
    FOREIGN KEY (`id_materials`)
    REFERENCES `mydb`.`materials` (`id_materials`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_news_materials1_idx` ON `mydb`.`news` (`id_materials` ASC) VISIBLE;

CREATE UNIQUE INDEX `id_news_UNIQUE` ON `mydb`.`news` (`id_news` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`users` ;

CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id_users` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `firstname` VARCHAR(45) NULL DEFAULT NULL,
  `surname` VARCHAR(45) NULL DEFAULT NULL,
  `organization` VARCHAR(45) NULL DEFAULT NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id_users`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users_has_courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`users_has_courses` ;

CREATE TABLE IF NOT EXISTS `mydb`.`users_has_courses` (
  `id_courses` INT NOT NULL,
  `id_users` INT NOT NULL,
  `start_date` VARCHAR(45) NULL,
  `finish_date` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`id_courses`, `id_users`),
  CONSTRAINT `fk_courses_has_users_courses1`
    FOREIGN KEY (`id_courses`)
    REFERENCES `mydb`.`courses` (`id_courses`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_courses_has_users_users1`
    FOREIGN KEY (`id_users`)
    REFERENCES `mydb`.`users` (`id_users`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_courses_has_users_users1_idx` ON `mydb`.`users_has_courses` (`id_users` ASC) VISIBLE;

CREATE INDEX `fk_courses_has_users_courses1_idx` ON `mydb`.`users_has_courses` (`id_courses` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`users_has_materials`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`users_has_materials` ;

CREATE TABLE IF NOT EXISTS `mydb`.`users_has_materials` (
  `id_users` INT NOT NULL,
  `id_materials` INT NOT NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`id_users`, `id_materials`),
  CONSTRAINT `fk_users_has_materials1_users1`
    FOREIGN KEY (`id_users`)
    REFERENCES `mydb`.`users` (`id_users`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_materials1_materials1`
    FOREIGN KEY (`id_materials`)
    REFERENCES `mydb`.`materials` (`id_materials`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_users_has_materials1_materials1_idx` ON `mydb`.`users_has_materials` (`id_materials` ASC) VISIBLE;

CREATE INDEX `fk_users_has_materials1_users1_idx` ON `mydb`.`users_has_materials` (`id_users` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
