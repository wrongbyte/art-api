import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;

export default () => new Pool({
    connectionString,
  });