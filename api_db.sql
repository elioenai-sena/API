-- Adminer 4.8.1 MySQL 5.5.5-10.5.11-MariaDB-1:10.5.11+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE `api_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `api_db`;

DROP TABLE IF EXISTS `contatos`;
CREATE TABLE `contatos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `dataNascimento` varchar(20) DEFAULT NULL,
  `emailUsuario` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `contatos`;
INSERT INTO `contatos` (`id`, `nome`, `email`, `telefone`, `dataNascimento`, `emailUsuario`) VALUES
(1,	'Elioenai Araujo',	'claro@gmail.com',	'819999123456789879',	'1977-01-31',	'elioenai@gmail.com'),
(25,	'Julieta',	'julieta@gmail.com',	'2121212235',	'2021-08-11',	'elioenai@gmail.com'),
(26,	'Luciano',	'luciano@gmail.com',	'51212121211234',	'2021-08-18',	'elioenai@gmail.com'),
(37,	'Luciano',	'luciano@gmail.com',	'21212121',	'2021-08-04',	'elioenai@gmail.com'),
(38,	'novoContato',	'n@ccc.com',	'2121',	'2021-08-12',	'jj@gmail.com'),
(39,	'Luciano',	'luciano@gmail.com',	'8199999999',	'1999-01-12',	'elioenai@gmail.com');

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `usuario`;
INSERT INTO `usuario` (`id`, `email`, `nome`, `senha`) VALUES
(1,	'elioenai@gmail.com',	'Elioenai Araujo',	'1234'),
(27,	'jj@gmail.com',	'junio',	'1234');

-- 2021-08-19 00:56:02
