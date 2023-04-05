-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               10.6.5-MariaDB - mariadb.org binary distribution
-- Server Betriebssystem:        Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Exportiere Datenbank Struktur für workwise_blog
CREATE DATABASE IF NOT EXISTS `workwise_blog` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `workwise_blog`;

-- Exportiere Struktur von Tabelle workwise_blog.articles
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `date_created` int(11) NOT NULL,
  `date_publish` int(11) NOT NULL,
  `date_expire` int(11) NOT NULL,
  `author` text NOT NULL,
  `author_age` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle workwise_blog.articles: ~6 rows (ungefähr)
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
REPLACE INTO `articles` (`id`, `title`, `content`, `date_created`, `date_publish`, `date_expire`, `author`, `author_age`) VALUES
	(7, 'test title 20', 'test content', 1679924715, 0, 0, 'Franz', 66),
	(8, 'test title 24', 'test content here', 1679926470, 0, 0, 'Karl', 68),
	(9, 'test title 30', 'test content here', 1679928209, 0, 0, 'Franz', 66),
	(10, 'test title 25', '', 1679928664, 0, 1679924715, 'Franz', 66),
	(14, 'test title 14', 'test', 1680570164, 0, 0, 'Hans', 70),
	(15, 'test title 15', 'test', 1680570246, 0, 0, 'Hans', 70);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle workwise_blog.articles_tags_tags
CREATE TABLE IF NOT EXISTS `articles_tags_tags` (
  `articlesId` int(11) NOT NULL,
  `tagsId` int(11) NOT NULL,
  PRIMARY KEY (`articlesId`,`tagsId`),
  KEY `IDX_0adb8d108330d74e4a7f7d29de` (`articlesId`),
  KEY `IDX_dcd523dc6473a35e6cb0cbf9f2` (`tagsId`),
  CONSTRAINT `FK_0adb8d108330d74e4a7f7d29de2` FOREIGN KEY (`articlesId`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_dcd523dc6473a35e6cb0cbf9f2d` FOREIGN KEY (`tagsId`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Exportiere Daten aus Tabelle workwise_blog.articles_tags_tags: ~0 rows (ungefähr)
/*!40000 ALTER TABLE `articles_tags_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `articles_tags_tags` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle workwise_blog.tags
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle workwise_blog.tags: ~4 rows (ungefähr)
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
REPLACE INTO `tags` (`id`, `name`) VALUES
	(1, 'Food'),
	(2, 'Life'),
	(3, 'Work'),
	(4, 'Lifestyle');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle workwise_blog.tag_in_article
CREATE TABLE IF NOT EXISTS `tag_in_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle workwise_blog.tag_in_article: ~9 rows (ungefähr)
/*!40000 ALTER TABLE `tag_in_article` DISABLE KEYS */;
REPLACE INTO `tag_in_article` (`id`, `tag_id`, `article_id`) VALUES
	(3, 1, 7),
	(4, 3, 7),
	(5, 4, 8),
	(6, 3, 8),
	(7, 4, 9),
	(8, 3, 9),
	(9, 1, 8),
	(10, 3, 10),
	(11, 4, 10);
/*!40000 ALTER TABLE `tag_in_article` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
