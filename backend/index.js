const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5000;

const connection = mysql.createConnection({
  host: 'db',               // MySQL service name in docker-compose
  user: 'root',
  password: 'secret',
  database: 'testdb',
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  } else {
    console.log('Connected to MySQL!');
  }
});

app.get('/api/message', (req, res) => {
  connection.query('SELECT NOW() AS now', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: `Current time from DB: ${results[0].now}` });
  });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
