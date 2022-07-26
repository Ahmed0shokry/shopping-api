import client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
};

export class ProductModel {
    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const query = 'SELECT * FROM products';
            const result = await connection.query(query);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Failed to get products, error: ${error}`
            );
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const connection = await client.connect();
            const query = `SELECT * FROM products WHERE id=($1)`;
            const result = await connection.query(query, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Failed to get that product, error: ${error}`
            );
        }
    }

    async create(product: Product): Promise<any> {
        try {
            const connection = await client.connect();
            const query = 'INSERT INTO products (name, price) VALUES( $1 , $2 ) RETURNING *';
           const result = await connection.query(query, [product.name, product.price]);
            connection.release();
            console.log(result.rows)
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Failed to add a product, error: ${error}`
            );
        }
    }
}