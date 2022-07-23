
export function insertUsers(): string {

   return `

INSERT INTO users (firstName, lastName, password) VALUES 
('Hossam', 'Abubakr', '123456'),
('Mohammed', 'Elzanaty', '123456'),
('Amr', 'Hassan', '123456'),
('Ziyad', 'Khalil', '123456');
`;

}
export function insertProducts(): string {
    return `
INSERT INTO products (name, price) VALUES 
('product 1', 111),
('product 2', 222),
('product 3', 333),
('product 4', 444),
('product 5', 555),
('product 6', 666),
('product 7', 777),
('product 8', 888),
('product 9', 999),
('product 10', 101),
('product 11', 110),
('product 12', 120),
('product 13', 130),
('product 14', 140),
('product 15', 150),
('product 16', 160),
('product 17', 170),
('product 18', 180),
('product 19', 190),
('product 20', 200);
`;
}

export function insertOrders(): string {
   return  "INSERT INTO orders (status, user_id) VALUES (1, 1), (1, 1), (1, 1) , (2, 1), (2, 1);";
}

export function insertProductsInOrders(): string {

    return `
INSERT INTO order_product (order_id, product_id, quantity) VALUES
(1,1, 3), (1,2, 3), (1,3, 3), (1,4, 3),
(2,2, 4), (2,3, 4), (2,5, 4),
(3,11, 6), (3,12, 6), (3,13, 6), (3,15, 6),
(4,1, 5), (4,2, 5), (4,4, 5),
(5,1, 8), (5,2, 8), (5,3, 8), (5,4, 8), (5,5, 8);
`;
}

//select orders.id as id, status, quantity, product_id from orders join order_product on orders.id=1 and order_product.order_id = 1, group by id;