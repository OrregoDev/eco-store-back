
CREATE DATABASE IF NOT EXISTS eco;
USE eco;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `number` varchar(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(85) NOT NULL,
  `country` varchar(56) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_rol_id` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB;




--
-- Estructura de tabla para la tabla `articles`
--

CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(255) NOT NULL,
  `id_author` int(255) NOT NULL,
  `title` varchar(100) NOT NULL,
  `summary` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_author_id` FOREIGN KEY (`id_author`) REFERENCES `users` (`id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;




--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(255) NOT NULL,
  `name` varchar(90) NOT NULL,
  `price` int(8) NOT NULL,
  `quantity` int(2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `id_category` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(255) NOT NULL,
  `id_author` int(255) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(255) NOT NULL,
  `id_article` int(255) NOT NULL,
  `approved` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_id_author` FOREIGN KEY (`id_author`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_id_article` FOREIGN KEY (`id_article`) REFERENCES `articles` (`id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `product_id` int(255) NOT NULL,
  `payment_method` varchar(80) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------


