const express = require('express');
const Subscriber = require('../models/Subscriber');
const router = express.Router();

// GET all subscribers
router.get('/subscribers', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET all subscribers' names
router.get('/subscribers/names', async (req, res) => {
    try {
        const subscribers = await Subscriber.find({}, 'name subscribedChannel');
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET subscriber by ID
router.get('/subscribers/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) return res.status(404).json({ message: 'Subscriber not found' });
        res.json(subscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET subscriber by name (optional)
router.get('/subscribers/name/:name', async (req, res) => {
    try {
        const subscriber = await Subscriber.findOne({ name: req.params.name });
        if (!subscriber) return res.status(404).json({ message: 'Subscriber not found' });
        res.json(subscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
