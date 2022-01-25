import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const { Pool } = pg;

export default () => new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
  });