import http from 'node:http';
import * as mariadb from 'mariadb';
import 'dotenv/config';
import pool from './pool.js';
import express from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing application/json
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello express!');
});

// Get all todos
app.get('/api/todos', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const todos = await conn.query('SELECT * FROM todo');
    res.status(200).json(todos);
  } catch (error) {
    console.error('Datenbankfehler:', error);
    res.status(500).json({ error: 'Serverfehler' });
  } finally {
    if (conn) conn.release();
  }
});

// Create new todo
app.post('/api/todos', async (req, res) => {
  if (!req.body || !req.body.title) {
    return res.status(400).json({ error: 'Titel ist erforderlich' });
  }
  const { title } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO todo (task) VALUES (?)',
      [title]
    );
    res.status(201).json({ id: result.insertId, title, completed: false });
  } catch (error) {
    console.error('Datenbankfehler:', error);
    res.status(500).json({ error: 'Serverfehler' });
  } finally {
    if (conn) conn.release();
  }
});

// start express server
app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});

/*
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
*/

