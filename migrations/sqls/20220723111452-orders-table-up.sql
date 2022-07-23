/* Replace with your SQL commands */
CREATE TABLE orders(
id SERIAL PRIMARY KEY,
user_id INTEGER,
FOREIGN KEY(user_id) REFERENCES users(id),
status SMALLINT
);