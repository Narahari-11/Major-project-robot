const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors({
    origin: 'https://fronnback3.onrender.com/', // Replace with your actual frontend URL for production
    methods: ['GET', 'POST'], // Specify allowed methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
}));

// Middleware to enable CORS
app.use(cors(corsOptions));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Route to serve the registration form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Change 'index.html' to your actual HTML file name if different
});

// Route to handle form submission
app.post('/register-bus-user', (req, res) => {
    const userData = req.body;
    
    // Example: log the user data
    console.log('User Data:', userData);
    
    // Respond with a success message
    res.status(200).json({ message: 'User registered successfully!' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ message: 'Something went wrong! Please try again later.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
