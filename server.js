const express = require('express');
const { MongoClient } = require("mongodb");
const server = express();
const port = 3000;
const mongoDBUrl = "mongodb://localhost:27017/";

server.use('/frontend', express.static('frontend'))
server.use('/frontend/css', express.static('frontend/css'))

server.get('/', (req, res) => {
    res.send('Server is up!');
});

server.get('/rooms', (req, res) => {
    const client = new MongoClient(mongoDBUrl, {
        family: 4,
        maxPoolSize: 200,
        maxConnecting: 15
    });
    let roomsCursor;

    async function getRoomData() {
        try {
            const database = client.db("sunshineDB");
            const rooms = database.collection("rooms");
            roomsCursor = await rooms.find();
            let result = [];

            for await (const doc of roomsCursor) {
                result.push(doc);
            }

            res.send(result);
        } finally {
            roomsCursor.close();
            await client.close();
        }
    }

    getRoomData().catch(console.dir);
});

server.get('/bookings', (req, res) => {
    const client = new MongoClient(mongoDBUrl, {
        family: 4,
        maxPoolSize: 200,
        maxConnecting: 15
    });
    let bookingsCursor;

    async function getRoomData() {
        try {
            const database = client.db("sunshineDB");
            const bookings = database.collection("bookings");
            bookingsCursor = await bookings.find();
            let result = [];

            for await (const doc of bookingsCursor) {
                result.push(doc);
            }

            res.send(result);
        } finally {
            bookingsCursor.close();
            await client.close();
        }
    }

    getRoomData().catch(console.dir);
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})