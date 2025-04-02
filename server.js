const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { username, email, password, name, age, bio } = req.body;

    console.log('Received registration data:', req.body);

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
    
    console.log('Executing query:', { query, values });

    const result = await pool.query(query, values);
    console.log('Insert result:', result.rows[0]);

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      detail: error.detail,
      code: error.code
    });
    res.status(500).json({ 
      message: 'Server error',
      detail: error.message 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});