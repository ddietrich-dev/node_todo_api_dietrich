import * as mariadb from 'mariadb';
import 'dotenv/config';

// create pool with connection informations
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5                // set limmit for asynchron connections
});

// export pool to make it usable in the index.js
export default pool;