const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, email, password, name, age, bio } = req.body;

    if (!username || !email || !password || !name || !age) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const numericAge = parseInt(age);
    if (isNaN(numericAge)) {
      return res.status(400).json({ message: 'Age must be a number' });
    }

    const userExists = await pool.query(
      'SELECT * FROM neonverse_db.users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO neonverse_db.users 
      (username, email, password, profile, name, age, bio) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`;

    const values = [username, email, hashedPassword, null, name, numericAge, bio || null];

    const result = await pool.query(query, values);
    res.status(201).json({ message: 'Registration successful', user: result.rows[0] });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error', detail: error.message });
  }
});

// Fetch events
app.get('/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM neonverse_db.events');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching events:', err.message);
    res.status(500).send('Server Error');
  }
});

// Fetch avatar assets
app.get('/avatar-assets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM neonverse_db.avatar_assets');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching avatar assets:', err.message);
    res.status(500).send('Server Error');
  }
});

// Fetch models by category
app.get('/models/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM neonverse_db.models WHERE category = $1',
      [category]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No models found for this category' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching models:', err.message);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});