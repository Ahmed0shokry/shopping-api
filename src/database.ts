import { Pool } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

const {
    POSTGRES_DB,
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_TEST,
    ENV
} = process.env

const poolConfigs = {
    host: POSTGRES_HOST,
    database: ENV == 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
};
const pool = new Pool(poolConfigs);
export default pool