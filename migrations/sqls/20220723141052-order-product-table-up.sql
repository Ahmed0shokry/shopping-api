/* Replace with your SQL commands */
CREATE TABLE order_product(
id SERIAL PRIMARY KEY,
order_id INTEGER ,
product_id INTEGER,
quantity INTEGER,
FOREIGN  KEY(order_id) REFERENCES orders(id),
FOREIGN KEY(product_id) REFERENCES products(id)
);