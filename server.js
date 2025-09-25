const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'Mounika@2004', 
    database: 'chat_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/api/messages', (req, res) => {
    pool.query('SELECT * FROM messages ORDER BY timestamp ASC', (error, results) => {
        if (error) {
            console.error('Error fetching messages:', error);
            return res.status(500).send('Error fetching messages');
        }
        res.json(results);
    });
});

app.post('/api/messages', (req, res) => {
    const { sender_name, message_text } = req.body;
    if (!sender_name || !message_text) {
        return res.status(400).send('Sender name and message text are required.');
    }

    pool.query('INSERT INTO messages (sender_name, message_text) VALUES (?, ?)', [sender_name, message_text], (error, results) => {
        if (error) {
            console.error('Error inserting message:', error);
            return res.status(500).send('Error inserting message');
        }
        res.status(201).json({ id: results.insertId, sender_name, message_text, timestamp: new Date() });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});