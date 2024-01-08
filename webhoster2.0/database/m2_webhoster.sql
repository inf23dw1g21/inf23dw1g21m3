
use webhoster;

DROP TABLE IF EXISTS `Plano`;

CREATE TABLE `Plano` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_de_plano` varchar(512) NOT NULL,
  `periodicidade` varchar(512) NOT NULL,
  `preco` int NOT NULL,
  `armazenamento` varchar(512) NOT NULL,
  `numero_de_contas_email` int NOT NULL,
  `numero_de_dominios` int NOT NULL,
  `largura_de_banda` varchar(512) NOT NULL,
  `fidelizacao` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `Plano` VALUES (1,'Básico','Mensal',10,'10 GB',1,1,'Ilimitada','Nenhuma'),(2,'Básico','Anual',100,'10 GB',1,1,'Ilimitada','1 mês grátis'),(3,'Intermédio','Mensal',20,'50 GB',5,3,'Ilimitada','Nenhuma'),(4,'Intermédio','Anual',200,'50 GB',5,3,'Ilimitada','2 meses grátis'),(5,'Avançado','Mensal',30,'100 GB',10,5,'Ilimitada','Nenhuma'),(6,'Avançado','Anual',300,'100 GB',10,5,'Ilimitada','3 meses grátis'),(7,'Premium','Mensal',40,'200 GB',20,10,'Ilimitada','Nenhuma'),(8,'Premium','Anual',400,'200 GB',20,10,'Ilimitada','4 meses grátis'),(9,'Ultra','Mensal',50,'500 GB',50,20,'Ilimitada','Nenhuma'),(10,'Ultra','Anual',500,'500 GB',50,20,'Ilimitada','5 meses grátis');


DROP TABLE IF EXISTS `Cliente`;

CREATE TABLE `Cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(512) NOT NULL,
  `tipo_de_conta` varchar(512) NOT NULL,
  `numero_fiscal` varchar(512) NOT NULL,
  `email` varchar(512) NOT NULL,
  `contacto` varchar(512) NOT NULL,
  `periodicidade_de_pagamento` varchar(512) NOT NULL,
  `data_ultimo_pagamento` datetime NOT NULL,
  `plano` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
INSERT INTO `Cliente` VALUES (1,'João Silva','Empresarial','123456789','joao@empresa.com','912345678','Mensal','2023-11-30 00:00:00',1),(2,'Maria Santos','Pessoal','234567890','maria@santos.com','923456789','Anual','2023-12-31 00:00:00',1),(3,'Pedro Costa','Empresarial','345678901','pedro@costa.com','934567890','Mensal','2023-11-30 00:00:00',1),(4,'Ana Sousa','Pessoal','456789012','ana@sousa.com','945678901','Anual','2023-12-31 00:00:00',2),(5,'Rui Oliveira','Empresarial','567890123','rui@oliveira.com','956789012','Mensal','2023-11-30 00:00:00',2),(6,'Carla Dias','Pessoal','678901234','carla@dias.com','967890123','Anual','2023-12-31 00:00:00',2),(7,'Bruno Fernandes','Empresarial','789012345','bruno@fernandes.com','978901234','Mensal','2023-11-30 00:00:00',2),(8,'Sofia Martins','Pessoal','890123456','sofia@martins.com','989012345','Anual','2023-12-31 00:00:00',3),(9,'Carlos Mendes','Empresarial','901234567','carlos@mendes.com','990123456','Mensal','2023-11-30 00:00:00',3),(10,'Lara Gomes','Pessoal','012345678','lara@gomes.com','901234567','Anual','2023-12-31 00:00:00',4),(11,'Tiago Nunes','Empresarial','112233445','tiago@nunes.com','911223344','Mensal','2023-11-30 00:00:00',4),(12,'Sara Rocha','Pessoal','223344556','sara@rocha.com','922334455','Anual','2023-12-31 00:00:00',4),(13,'Miguel Alves','Empresarial','334455667','miguel@alves.com','933445566','Mensal','2023-11-30 00:00:00',5),(14,'Clara Pinto','Pessoal','445566778','clara@pinto.com','944556677','Anual','2023-12-31 00:00:00',5),(15,'Ricardo Lima','Empresarial','556677889','ricardo@lima.com','955667788','Mensal','2023-11-30 00:00:00',5),(16,'Beatriz Cardoso','Pessoal','667788990','beatriz@cardoso.com','966778899','Anual','2023-12-31 00:00:00',5),(17,'André Correia','Empresarial','778899001','andre@correia.com','977889900','Mensal','2023-11-30 00:00:00',6),(18,'Inês Marques','Pessoal','889900112','ines@marques.com','988990011','Anual','2023-12-31 00:00:00',6),(19,'Diogo Silva','Empresarial','990011223','diogo@silva.com','999001122','Mensal','2023-11-30 00:00:00',7),(20,'Marta Reis','Pessoal','001122334','marta@reis.com','900112233','Anual','2023-12-31 00:00:00',7),(21,'Filipe Moreira','Empresarial','121212121','filipe@moreira.com','912121212','Mensal','2023-11-30 00:00:00',7),(22,'Catarina Lopes','Pessoal','232323232','catarina@lopes.com','923232323','Anual','2023-12-31 00:00:00',8),(23,'Gonçalo Ribeiro','Empresarial','343434343','goncalo@ribeiro.com','934343434','Mensal','2023-11-30 00:00:00',8),(24,'Joana Ferreira','Pessoal','454545454','joana@ferreira.com','945454545','Anual','2023-12-31 00:00:00',9),(25,'Daniel Santos','Empresarial','565656565','daniel@santos.com','956565656','Mensal','2023-11-30 00:00:00',9),(26,'Leonor Costa','Pessoal','676767676','leonor@costa.com','967676767','Anual','2023-12-31 00:00:00',10),(27,'Hugo Rodrigues','Empresarial','787878787','hugo@rodrigues.com','978787878','Mensal','2023-11-30 00:00:00',10),(28,'Eva Oliveira','Pessoal','898989898','eva@oliveira.com','989898989','Anual','2023-12-31 00:00:00',10),(29,'Marco Dias','Empresarial','909090909','marco@dias.com','990909090','Mensal','2023-11-30 00:00:00',10),(30,'Laura Monteiro','Pessoal','010101010','laura@monteiro.com','901010101','Anual','2023-12-31 00:00:00',5),(31,'João Mono','Pessoal','PT005020505','a05405@umaia.pt','54604606046','Mensal','2018-03-20 09:12:28',NULL);

DROP TABLE IF EXISTS `Dominio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Dominio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(512) NOT NULL,
  `codigo_TLD` varchar(512) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `data_de_inicio` datetime NOT NULL,
  `data_de_fim` datetime NOT NULL,
  `cliente` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 ;

INSERT INTO `Dominio` VALUES (1,'empresa','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',1),(2,'santos','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',2),(3,'costa','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',3),(4,'sousa','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',4),(5,'oliveira','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',5),(6,'dias','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',6),(7,'fernandes','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',7),(8,'martins','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',8),(9,'mendes','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',9),(10,'gomes','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',10),(11,'nunes','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',11),(12,'rocha','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',12),(13,'alves','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',13),(14,'pinto','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',14),(15,'lima','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',15),(16,'cardoso','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',16),(17,'correia','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',17),(18,'marques','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',18),(19,'silva','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',19),(20,'reis','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',20),(21,'moreira','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',21),(22,'lopes','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',22),(23,'ribeiro','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',23),(24,'ferreira','.com',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',24),(25,'santos','.net',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',25),(26,'costa','.net',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',26),(27,'rodrigues','.net',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',27),(28,'oliveira','.net',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',28),(29,'dias','.net',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',29),(30,'monteiro','.net',1,'2023-01-01 00:00:00','2024-01-01 00:00:00',30);

DROP TABLE IF EXISTS `Pagamento`;

CREATE TABLE `Pagamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL,
  `valor` int NOT NULL,
  `metodo_de_pagamento` varchar(512) NOT NULL,
  `numero_de_transacao` varchar(512) NOT NULL,
  `cliente` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 ;

INSERT INTO `Pagamento` VALUES (1,'2023-11-30 23:59:59',10,'Cartão de crédito','1111111111',1),(2,'2023-01-01 00:00:00',100,'PayPal','2222222222',2),(3,'2023-11-30 23:59:59',20,'Cartão de crédito','3333333333',3),(4,'2023-01-01 00:00:00',200,'PayPal','4444444444',4),(5,'2023-11-30 23:59:59',30,'Cartão de crédito','5555555555',5),(6,'2023-01-01 00:00:00',300,'PayPal','6666666666',6),(7,'2023-11-30 23:59:59',40,'Cartão de crédito','7777777777',7),(8,'2023-01-01 00:00:00',400,'PayPal','8888888888',8),(9,'2023-11-30 23:59:59',50,'Cartão de crédito','9999999999',9),(10,'2023-01-01 00:00:00',500,'PayPal','0000000000',10),(11,'2023-11-30 23:59:59',10,'Cartão de crédito','1010101010',11),(12,'2023-01-01 00:00:00',100,'PayPal','2020202020',12),(13,'2023-11-30 23:59:59',20,'Cartão de crédito','3030303030',13),(14,'2023-01-01 00:00:00',200,'PayPal','4040404040',14),(15,'2023-11-30 23:59:59',30,'Cartão de crédito','5050505050',15),(16,'2023-01-01 00:00:00',300,'PayPal','6060606060',16),(17,'2023-11-30 23:59:59',40,'Cartão de crédito','7070707070',17),(18,'2023-01-01 00:00:00',400,'PayPal','8080808080',18),(19,'2023-11-30 23:59:59',50,'Cartão de crédito','9090909090',19),(20,'2023-01-01 00:00:00',500,'PayPal','0101010101',20),(21,'2023-11-30 23:59:59',10,'Cartão de crédito','1212121212',21),(22,'2023-01-01 00:00:00',100,'PayPal','2323232323',22),(23,'2023-11-30 23:59:59',20,'Cartão de crédito','3434343434',23),(24,'2023-01-01 00:00:00',200,'PayPal','4545454545',24),(25,'2023-11-30 23:59:59',30,'Cartão de crédito','5656565656',25),(26,'2023-01-01 00:00:00',300,'PayPal','6767676767',26),(27,'2023-11-30 23:59:59',40,'Cartão de crédito','7878787878',27),(28,'2023-01-01 00:00:00',400,'PayPal','8989898989',28),(29,'2023-11-30 23:59:59',50,'Cartão de crédito','9090909090',29),(30,'2023-01-01 00:00:00',500,'PayPal','0101010101',30);
