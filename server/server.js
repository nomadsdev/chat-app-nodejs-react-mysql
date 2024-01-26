const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connection to database');
    } else {
        console.log('Connected to database');
    }
});

app.post('/api/messages', (req, res) => {
    const { user, message } = req.body;
    const sql = 'INSERT INTO messages (user, message) VALUES (?, ?)';
    db.query(sql, [user, message], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while saving the message' });
      } else {
        res.status(201).json({ message: 'Message saved successfully' });
      }
    });
});

app.get('/api/messages', (req, res) => {
    const sql = 'SELECT * FROM messages';
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching messages' });
      } else {
        res.status(200).json(results);
      }
    });
});

app.listen(port, () => {
    console.log('Server is running');
});
  