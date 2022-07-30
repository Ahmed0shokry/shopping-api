import client from '../database';
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'

dotenv.config()
export type User = {
    id?: number;
    firstname: string,
    lastname: string,
    password: string
};

export class UserModel {
    async index(): Promise<User[]> {
        try {
            const connection = await client.connect();
            const query = 'SELECT * FROM users';
            const result = await connection.query(query);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Failed to get users, error: ${error}`
            );
        }
    }

    async show(id: number): Promise<User> {
        try {
            const connection = await client.connect();
            const query = `SELECT * FROM users WHERE id=($1)`;
            const result = await connection.query(query, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Failed to get that user, error: ${error}`
            );
        }
    }

    async create(user: User): Promise<User> {
        try {
            const connection = await client.connect();
            const sql = `INSERT INTO users (firstname , lastname, password) values ($1 , $2 , $3 ) returning *`;
            const result = await connection.query(sql, [user.firstname, user.lastname, this.hash(user.password)]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Failed to add a order, error: ${error}`
            );
        }
    }
    hash(password: string) {
        const salt = parseInt(process.env.SALT_ROUNDS as string, 10)
        return bcrypt.hashSync(`${password}${process.env.BCRYPT_PASSWORD}`, salt)
    }

    async login(user: User): Promise<number> {
        try {
            const connection = await client.connect();
            const sql = `SELECT * FROM users WHERE firstname = ($1) and lastname = ($2)`
            const result = await connection.query(sql, [user.firstname, user.lastname]);
            connection.release();
            if (!result.rows.length) throw new Error(`user not found`);
            const isValid = bcrypt.compareSync(user.password + process.env.BCRYPT_PASSWORD, result.rows[0].password)
            if (!isValid) throw new Error(`ser data are wrong`);
            return result.rows[0].id as number;
        }
         catch (error) {
            throw new Error(`Failed to login with that user, Error: ${error}`)
        }
    }
}