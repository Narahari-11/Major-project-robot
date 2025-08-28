const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Simple CORS (allows all origins)
app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../Frontend/public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/public', 'index.html'));
});

app.get('/map', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/public', 'map.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/public', 'register.html'));
});

// Route to handle form submission
app.post('/register-bus-user', (req, res) => {
    const userData = req.body;
    console.log('User Data:', userData);
    res.status(200).json({ message: 'User registered successfully!' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ message: 'Something went wrong! Please try again later.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
