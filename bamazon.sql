DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE bamazon(
id INT (10) AUTO_INCREMENT NOT NULL,
item VARCHAR (20) NOT NULL,
catagory VARCHAR (20) NOT NULL,
price DECIMAL (10,2) NOT NULL,
stock INT (10) NOT NULL,
PRIMARY KEY (id)

);

INSERT INTO bamazon(item,catagory,price,stock)
VALUES
('stick','Clothing', 15.00, 4),
('notstick','Musical', 15.00, 5),
('defnotstick','Clothing', 35.00, 5),
('spensivestick','Medical', 35.00, 5),
('a1lsostick','Medical', 105.00, 5),
('discountstick','CD', 5.00, 5);



SELECT * FROM bamazon;