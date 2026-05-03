import express from 'express';
const app = express();
 
// First route
app.get('/', (req, res) => {
  res.send('Willkommen bei Ihrem ersten Express-Server!');
});
 
// Second route
app.get('/about', (req, res) => {
  res.send('Dies ist die About-Seite.');
});

// Third route
app.get('/:beispiel/:id', (req, res) => {
  console.log(req.method);   // GET
  console.log(req.url);      // /beispiel
  console.log(req.headers);  // HTTP-Header als Objekt
  console.log(req.params);   // URL-Parameter (:id etc.)
  console.log(req.query);    // Query-String-Parameter (?key=value)
  console.log(req.body);     // Request-Body (mit Middleware)
});

// JSON route
app.get('/json', (req, res) => {
  res.json({ message: 'Dies ist die JSON-Seite.' });
});

// Start server
app.listen(3000, () => {
  console.log('Server läuft auf http://localhost:3000');
});