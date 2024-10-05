const express = require('express');
const mongoose = require('mongoose');
const subscriberRoutes = require('./routes/subscriberRoutes');
const Subscriber = require('./models/Subscriber'); // Import the Subscriber model

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

const DATABASE_URL = "mongodb://localhost/subscribers"; // Your MongoDB URI

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api', subscriberRoutes);

// Route for the homepage
app.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find(); // Fetch subscribers from the database
        res.render('index', { subscribers }); // Pass subscribers to the view
    } catch (error) {
        res.status(500).send('Error fetching subscribers');
    }
});

module.exports = app;
