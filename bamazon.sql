CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Vans Authentic Shoes', 'Clothing', 49.99, 50),
		('Vans Authentic Hi-Tops', 'Clothing', 59.99, 50),
		('Vans Authentic Slip-Ons', 'Clothing', 49.99, 50),
		('Vans Era Classic', 'Clothing', 49.99, 25),
		('Mens Zip-Up Hoodie(Black)', 'Clothing', 35.00, 100),
		('Mens Zip-Up Hoodie(Navy Blue)', 'Clothing', 35.00, 100),
		('Mens Zip-Up Hoodie(Charcoal Gray)', 'Clothing', 35.00, 100),
		('Mens T-Shirt(Charcoal Gray)', 'Clothing', 10.00, 200),
		('Mens T-Shirt(Black)', 'Clothing', 10.00, 200),
		('Mens T-Shirt(Navy Blue)', 'Clothing', 10.00, 200),
		;