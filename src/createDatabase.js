// src/createDatabase.js
const mongoose = require('mongoose');
const Subscriber = require('./models/Subscriber');

const DATABASE_URL = "mongodb://localhost/subscribers"; // Your MongoDB URI

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');

        // Clear existing subscribers
        await Subscriber.deleteMany({});

        // Create new subscribers
        const subscribers = [
            { name: 'John Doe', subscribedChannel: 'Channel A' },
            { name: 'Jane Smith', subscribedChannel: 'Channel B' },
            { name: 'Alice Johnson', subscribedChannel: 'Channel C' },
        ];

        await Subscriber.insertMany(subscribers);
        console.log('Database populated with initial subscribers');

        mongoose.connection.close(); // Close the connection
    })
    .catch(err => {
        console.error('Database connection error:', err);
        mongoose.connection.close();
    });
