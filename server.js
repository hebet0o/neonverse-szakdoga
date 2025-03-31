const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;
const secretKey = 'your_secret_key'; // Replace with your secret key

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
});

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, email, password, name, age, bio } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, email, password, name, age, bio) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [username, email, hashedPassword, name, age, bio]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).send('Server Error');
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.user_id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error logging in:', err.message);
        res.status(500).send('Server Error');
    }
});

// Protected route example
app.get('/protected', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        res.json({ message: 'Protected route accessed', userId: decoded.userId });
    });
});

app.get('/events', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM neonverse_db.events');
        console.log('Fetched events:', result.rows); // Log the fetched events
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching events:', err.message); // Log the error message
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

/*
DB Init:

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    profile JSONB,
    name VARCHAR(50) NOT NULL,
    age INT,
    bio VARCHAR(255)
);

CREATE TABLE Events (
    event_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    short_description VARCHAR(255),
    long_description VARCHAR(500),
    date DATE NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE,
    location VARCHAR(50),
    organizer INT REFERENCES Users(user_id) ON DELETE SET NULL
);

create table users_events (
    user_id int not NULL,
    event_id int not NULL,
    primary key(user_id, event_id)
);

alter table users_events
add foreign key (user_id) references Users(user_id),
add foreign key (event_id) references Events(event_id);


CREATE TABLE Models (
    model_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    file_url VARCHAR(100) NOT NULL,
    owner INT REFERENCES Users(user_id) ON DELETE CASCADE,
    tags VARCHAR[],
    category VARCHAR(50)
);

CREATE TABLE VirtualAssets (
    asset_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    model_id INT REFERENCES Models(model_id) ON DELETE CASCADE,
    price FLOAT NOT NULL,
    category VARCHAR(50),
    owner INT REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE AvatarAccessories (
    accessory_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    model_id INT REFERENCES Models(model_id) ON DELETE CASCADE,
    category VARCHAR(50),
    price FLOAT NOT NULL,
    owner INT REFERENCES Users(user_id) ON DELETE CASCADE
);

*/