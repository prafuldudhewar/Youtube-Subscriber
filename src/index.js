// src/index.js
const mongoose = require('mongoose');
const app = require('./app'); // This should match the exported app
const DATABASE_URL = "mongodb://localhost/subscribers"; // Your MongoDB URI
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.error('Database connection error:', err));
