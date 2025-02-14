const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
}
app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
 
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
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