create database lista_relatorios;
use lista_relatorios;

create table relatorios(
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
link varchar(300) NOT NULL,
data_de_publicacao DATE NOT NULL
);