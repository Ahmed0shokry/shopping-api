import client from '../database';

export type Order = {
    id?: number;
    status: number;
    products?: Array<{product_id: number, quantity:number}>,
    user_id: number;
};

export class OrderModel {
    async index(): Promise<Order[]> {
        try {
            const connection = await client.connect();
            const query = 'SELECT * FROM orders';
            const result = await connection.query(query);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Failed to get orders, error: ${error}`
            );
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const connection = await client.connect();
            let query = `SELECT id, status, user_id FROM orders WHERE orders.id=($1)`;
            const orders = await connection.query(query, [id]);
            query = `SELECT quantity, product_id FROM order_product WHERE order_id=($1)`;
            const products = await connection.query(query, [id]);
            connection.release();
            orders.rows[0]['products'] = products.rows;
            return orders.rows[0];
        } catch (error) {
            throw new Error(
                `Failed to get that order, error: ${error}`
            );
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const connection = await client.connect();
            const query = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
            const result = await connection.query(query, [order.status, order.user_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Failed to add a order, error: ${error}`
            );
        }
    }
}