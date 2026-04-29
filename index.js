import http from 'node:http';
import * as mariadb from 'mariadb';
import 'dotenv/config';


const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});
console.log(pool);

// test once when starting in the terminal
try {    
    const conn = await pool.getConnection();
    console.log(conn);
    const todos = await conn.query('SELECT * FROM todo');
    conn.release();
    console.log(todos);
} catch (err) {
    console.error('Test error:', err);
}

// create server
const server = http.createServer(async(req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const conn = await pool.getConnection();
 
    try {
        const todos = await conn.query('SELECT * FROM todo');
 
        res.end(JSON.stringify(todos));
    } catch (error) {
        console.error(error);
 
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Tut uns leid, da ist etwas schief gelaufen.' }));
    } finally {
        conn.release();
    }
});

server.listen(3000, '0.0.0.0', () => console.log('Server runs on port http://myserver1:3000'));


