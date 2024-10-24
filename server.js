const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 19594;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'mysql-loan-application-backupcredita-5ebc.g.aivencloud.com',
    user: 'avnadmin', // replace with your MySQL username
    password: 'AVNS_imXagB_IpbsjzLVeOfc', // replace with your MySQL password
    database: 'vacancy_form_db', // replace with your database name
    port:19594
 
    
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
    console.log(`Server is running on https://vacancy-form-backend.onrender.com:${19594}`);
});
