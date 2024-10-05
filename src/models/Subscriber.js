// src/models/Subscriber.js
const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subscribedChannel: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // Optional: adds createdAt and updatedAt timestamps

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
