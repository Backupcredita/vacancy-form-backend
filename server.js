const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Host', // replace with your MySQL username
    password: 'Creditafinance@123', // replace with your MySQL password
    database: 'vacancy_form_db' // replace with your database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// POST route for form submission
app.post('/apply', (req, res) => {
    const { name, email, phone, location, qualification, salary, employed, employer, years } = req.body;

    const query = 'INSERT INTO applications (name, email, phone, location, qualification, salary, employed, employer, years) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [name, email, phone, location, qualification, salary, employed, employer, years];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'Application submitted successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
