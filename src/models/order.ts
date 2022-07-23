import client from '../database';

export type Order = {
    id?: number;
    status?: number;
    product_id?: number,
    quantity?: number,
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
            const query = `
                SELECT orders.id as id, status, quantity, product_id 
                FROM orders join order_product 
                WHERE orders.id=(${id}) and order_product.order_id = (${id}) `;
            const result = await connection.query(query, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Failed to get that order, error: ${error}`
            );
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const connection = await client.connect();
            const query = 'INSERT INTO orders (name, user_id) VALUES($1, $2) RETURNING *';
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