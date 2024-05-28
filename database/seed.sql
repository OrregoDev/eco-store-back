
-- Business data
INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user');


INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'personal_care'),
(2, 'household'),
(3, 'eco_food'),
(4, 'cannabic_products');


-- -******************************-

-- Example data

INSERT INTO `users` (`id`, `name`, `last_name`, `email`, `number`, `address`, `city`, `country`, `rol_id`, `password`) VALUES
(7, 'Juan Pérez', 'Pérez', 'juan.perez@example.com', '+1234567890', 'Calle Falsa 123', 'Ciudad Ejemplo', 'País Ejemplo', 2, '$2a$10$l5ogBlFUlb80W'),
(9, 'Juan Pérez', 'Pérez', 'juan.perez2@example.com', '+1234567890', 'Calle Falsa 1234', 'Ciudad Ejemplo', 'País Ejemplo', 2, '$2a$10$6o5vIQli34jmg');



INSERT INTO `products` (`id`, `name`, `price`, `quantity`, `image`, `id_category`) VALUES
(1, 'cepillo de bambú', 5, 10, 'https://cdn.pixabay.com/photo/2024/05/22/19/55/brush-8781563_960_720.jpg', 1),
(2, 'shampoo ecologico', 10, 10, 'https://cdn.pixabay.com/photo/2024/05/22/19/57/brush-8781570_960_720.jpg', 1),
(3, 'copitos ecológicos', 10, 10, 'https://cdn.pixabay.com/photo/2024/05/22/19/56/brush-8781566_960_720.jpg', 1),
(4, 'jabón ecológico ', 5, 10, 'https://cdn.pixabay.com/photo/2024/05/22/19/59/brush-8781573_960_720.jpg', 1),
(5, 'cepillo para cuerpo de bambú', 10, 10, 'https://cdn.pixabay.com/photo/2024/05/22/19/58/brush-8781572_960_720.jpg', 1),
(6, 'Peinilla ecológica', 5, 10, 'https://cdn.pixabay.com/photo/2024/05/22/20/01/brush-8781575_960_720.jpg', 1),
(7, 'Tampones Ecológicos', 15, 10, 'https://cdn.pixabay.com/photo/2024/05/22/20/00/brush-8781574_960_720.jpg', 1),
(8, 'cosmetiquera ecológica', 20, 10, 'https://cdn.pixabay.com/photo/2024/05/23/01/45/decoration-8782043_960_720.png', 2),
(9, 'cubiertos de bambú', 25, 10, 'https://cdn.pixabay.com/photo/2024/05/23/01/45/decoration-8782042_960_720.png', 2),
(10, 'set de cucharas de palo', 30, 10, 'https://cdn.pixabay.com/photo/2024/05/23/01/45/decoration-8782041_960_720.png', 2),
(11, 'recipientes ecológicos', 50, 10, 'https://cdn.pixabay.com/photo/2024/05/23/01/33/decoration-8782025_960_720.png', 2),
(12, 'ganchos ecologicos', 10, 10, 'https://raw.githubusercontent.com/WFaguirre/ecostoreimg/main/Productos%20Hogar/ganchos.jpg', 2),
(13, 'set utensilios ecologicos', 45, 10, 'https://cdn.pixabay.com/photo/2024/05/23/01/44/decoration-8782039_960_720.png', 2),
(14, 'cepillos de aseo ecológicos', 20, 10, 'https://cdn.pixabay.com/photo/2024/05/23/01/45/decoration-8782040_960_720.png', 2),
(15, 'limpiadores ecológicos', 20, 10, 'https://raw.githubusercontent.com/WFaguirre/ecostoreimg/main/Productos%20Hogar/limpiadoresEco.jpg\r\n', 2),
(16, 'almendras', 10, 10, 'https://raw.githubusercontent.com/WFaguirre/ecostoreimg/main/Productos%20alimenticios/almendras.png', 3),
(17, 'avena', 10, 10, 'https://raw.githubusercontent.com/WFaguirre/ecostoreimg/main/Productos%20alimenticios/avena.png', 3),
(18, 'jugo verde', 5, 10, 'https://raw.githubusercontent.com/WFaguirre/ecostoreimg/main/Productos%20alimenticios/batidoEco.png', 3),
(19, 'cereales', 5, 10, 'https://cdn.pixabay.com/photo/2024/05/23/01/03/almonds-8781993_960_720.png', 3),
(20, 'chía', 5, 10, 'https://cdn.pixabay.com/photo/2024/05/23/01/06/almonds-8781994_960_720.png', 3),
(21, 'hamburguesas veganas', 10, 10, 'https://cdn.pixabay.com/photo/2024/05/23/00/47/almonds-8781986_960_720.png', 3),
(22, 'proteína vegana', 25, 10, 'https://cdn.pixabay.com/photo/2024/05/23/01/00/almonds-8781991_960_720.png', 3),
(23, 'semillas de girasol', 15, 10, 'https://cdn.pixabay.com/photo/2024/05/23/01/20/almonds-8782021_960_720.png', 3),
(24, 'barra de proteína vegana', 10, 10, 'https://pixabay.com/es/photos/almendras-vegano-ecologico-organico-8781981/', 3),
(25, 'Yogurt', 10, 10, 'https://cdn.pixabay.com/photo/2024/05/23/00/56/almonds-8781989_960_720.png', 3),
(26, 'aceite de cannabis', 25, 10, 'https://github.com/WFaguirre/ecostoreimg/blob/main/Productos%20cannabicos/aceite.jpg?raw=true', 4),
(27, 'crema corporal de cannabis', 30, 10, 'https://raw.githubusercontent.com/WFaguirre/ecostoreimg/main/Productos%20cannabicos/cremaMari.jpg', 4),
(28, 'juguete para gatos con cannabis', 20, 10, 'https://raw.githubusercontent.com/WFaguirre/ecostoreimg/main/Productos%20cannabicos/gatoMari.png', 4),
(29, 'jabón de cannabis', 20, 10, 'https://raw.githubusercontent.com/WFaguirre/ecostoreimg/main/Productos%20cannabicos/jabonMari.jpg	', 4);

