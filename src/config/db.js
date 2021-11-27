require('dotenv').config();
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
  });

module.exports = () => { return pool; }