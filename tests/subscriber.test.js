// tests/subscriber.test.js
const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary
const mongoose = require('mongoose');
const Subscriber = require('../src/models/Subscriber');

const DATABASE_URL = "mongodb://localhost/subscribers";

beforeAll(async () => {
    await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Subscriber API', () => {
    beforeEach(async () => {
        await Subscriber.deleteMany({});
        await Subscriber.insertMany([
            { name: 'John Doe', subscribedChannel: 'Channel A' },
            { name: 'Jane Smith', subscribedChannel: 'Channel B' },
        ]);
    });

    test('GET /api/subscribers should return all subscribers', async () => {
        const res = await request(app).get('/api/subscribers');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(2);
    });

    test('GET /api/subscribers/names should return subscriber names', async () => {
        const res = await request(app).get('/api/subscribers/names');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: expect.any(String), subscribedChannel: expect.any(String) }),
        ]));
    });

    test('GET /api/subscribers/:id should return a subscriber by ID', async () => {
        const subscriber = await Subscriber.findOne({ name: 'John Doe' });
        const res = await request(app).get(`/api/subscribers/${subscriber._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name', 'John Doe');
    });

    test('GET /api/subscribers/:id with invalid ID should return 400', async () => {
        const res = await request(app).get('/api/subscribers/invalidID');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message');
    });
});
