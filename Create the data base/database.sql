CREATE TABLE `funcion` (
  `id_funcion` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipof` int(11) NOT NULL,
  `id_sala` int(11) NOT NULL,
  `n_pelicula` varchar(100) NOT NULL,
  `fecha` varchar(30) NOT NULL,
  `hr_i` time NOT NULL,
  `sta` int(11) DEFAULT 1,
  PRIMARY KEY (`id_funcion`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `boletos` (
  `id_boleto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(10) DEFAULT NULL,
  `id_funcion` int(11) DEFAULT NULL,
  `id_sala` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`id_boleto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `id_suc` int(11) DEFAULT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `rol` varchar(1) DEFAULT NULL,
  `sta` int(11) DEFAULT 1,
  PRIMARY KEY (`id_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;


-- CREATE TABLE `Inventario` (
--   `id_inventario` int(11) NOT NULL AUTO_INCREMENT,
--   `id_productos` int(11) DEFAULT NULL,
--   `id_suc` int(11) DEFAULT NULL,
--   `num_existencias` int(11) DEFAULT NULL,
--   `status` int(11) DEFAULT 1,
--   PRIMARY KEY (`id_inventario`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `peliculas` (
  `id_pelicula` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `sinopsis` varchar(1000) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`id_pelicula`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `productos` (
  `id_productos` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) DEFAULT NULL,
  `descripcion` varchar(80) DEFAULT NULL,
  `id_suc` int(11) DEFAULT NULL,
  `categorias` varchar(10) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `img` varchar(70) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`id_productos`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `registros` (
  `id_reg` int(11) NOT NULL AUTO_INCREMENT,
  `nickname_emp` varchar(20) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `sta` int(11) NOT NULL,
  PRIMARY KEY (`id_reg`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `salas` (
  `id_sala` int(11) NOT NULL AUTO_INCREMENT,
  `id_suc` int(11) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `num_asientos` int(11) DEFAULT NULL,
  `asientos_u` int(11) DEFAULT 0,
  `tipo` int(1) DEFAULT 1,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`id_sala`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `sucursal` (
  `id_suc` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) DEFAULT NULL,
  `direccion` varchar(400) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`id_suc`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `tipofuncion` (
  `id_tipof` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`id_tipof`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `ventasfunciones` (
  `id_ventasF` int(11) NOT NULL AUTO_INCREMENT,
  `id_suc` int(11) DEFAULT NULL,
  `fecha` date DEFAULT current_timestamp(),
  `folio` varchar(10) DEFAULT NULL,
  `sta` int(11) DEFAULT 1,
  `u_asientos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '{}',
  `id_sala` int(11) DEFAULT NULL,
  `n_pelicula` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_ventasF`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `ventasproductos` (
  `id_ventasP` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT current_timestamp(),
  `folio` varchar(10) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `nombre` varchar(45) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  PRIMARY KEY (`id_ventasP`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;


--Tipos sala
INSERT INTO `salas` (`id_sala`,`id_suc`,`nombre`,`num_asientos`,`asientos_u`,`tipo`,`status`) VALUES (1,1,'Sala1 - 3D',25,0,3,1);
INSERT INTO `salas` (`id_sala`,`id_suc`,`nombre`,`num_asientos`,`asientos_u`,`tipo`,`status`) VALUES (2,1,'Sala2 - Normal',30,0,1,1);
INSERT INTO `salas` (`id_sala`,`id_suc`,`nombre`,`num_asientos`,`asientos_u`,`tipo`,`status`) VALUES (3,1,'Sala3 - Normal',30,0,1,1);
INSERT INTO `salas` (`id_sala`,`id_suc`,`nombre`,`num_asientos`,`asientos_u`,`tipo`,`status`) VALUES (4,1,'Sala4 - Normal',30,0,1,1);
INSERT INTO `salas` (`id_sala`,`id_suc`,`nombre`,`num_asientos`,`asientos_u`,`tipo`,`status`) VALUES (5,1,'Sala5 - Normal',30,0,1,1);
INSERT INTO `salas` (`id_sala`,`id_suc`,`nombre`,`num_asientos`,`asientos_u`,`tipo`,`status`) VALUES (6,1,'Sala6 - Infantil',35,0,2,1);
INSERT INTO `salas` (`id_sala`,`id_suc`,`nombre`,`num_asientos`,`asientos_u`,`tipo`,`status`) VALUES (7,2,'Sala1 - 3D',25,0,3,1);

--sucursales
INSERT INTO `sucursales` (`id_suc`,`nombre`,`direccion`,`status`) VALUES (1,'Roma','Merida 33, Roma Nte., Cuauhtémoc, 06700 Ciudad de México, CDMX',1);
INSERT INTO `sucursales` (`id_suc`,`nombre`,`direccion`,`status`) VALUES (2,'Buenavista','Eje 1 Nte. 259, Buenavista, Cuauhtémoc, 06350 Ciudad de México, CDMX',1);
INSERT INTO `sucursales` (`id_suc`,`nombre`,`direccion`,`status`) VALUES (3,'Queretaro','Naranjos Punta Juriquilla 1000 Santa Rosa Jáuregui, 76230 Santiago de Querétaro, Qro.',1);
INSERT INTO `sucursales` (`id_suc`,`nombre`,`direccion`,`status`) VALUES (4,'Toluca','De Las Palmas Poniente 416, San Jorge Pueblo Nuevo, 52164 Metepec, Méx.',1);
INSERT INTO `sucursales` (`id_suc`,`nombre`,`direccion`,`status`) VALUES (5,'Naucalpan','Paseo de Las Aves 1, San Mateo Nopala, 53220 Naucalpan de Juárez, Méx.',1);

--usuario 
INSERT INTO `CinesUVM`.`empleados` (`nombre`, `telefono`, `id_suc`, `nickname`, `password`, `rol`, `sta`) VALUES ('1', '-', '1', '1', '1', 's', '1');
