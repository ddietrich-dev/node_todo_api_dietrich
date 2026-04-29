import http from 'node:http';
import * as mariadb from 'mariadb';
import 'dotenv/config';
import pool from './pool.js';

const PORT = 3000;

const server = http.createServer(async(req, res) => {       // create server object
    if (req.url === '/api/todos' && req.method === 'GET') {
        let conn;
        try {    
            const conn = await pool.getConnection();        // get connection from pool
            console.log(conn);
            const todos = await conn.query('SELECT * FROM todo');      // sql query
            conn.release();
            console.log(todos);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(todos));
    
        } catch (err) {                             // set error handling
            console.error('Database error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal server error.' }));
    } finally {
        if (conn) conn.release();
    } 
} else {
    // fallback for wrong routes
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Page or route not found.' }));
    }   
});

server.listen(PORT, () => console.log(`Server runs on port http://myserver1:${PORT}`));


