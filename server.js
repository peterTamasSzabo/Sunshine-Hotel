//MongoDB és express

const express = require('express');
const { MongoClient } = require("mongodb");
const server = express();
server.use(express.json()) // for parsing application/json

const port = 3000;
const mongoDBUrl = "mongodb://localhost:27017/";

server.use('/frontend', express.static('frontend'))
server.use('/frontend/css', express.static('frontend/css'))

server.get('/', (req, res) => {
    res.send('Server is up!');
});

server.post('/insertBooking', (req, res) => {
    //létrehozunk egy MongoDB klienst
    const client = new MongoClient(mongoDBUrl, {
        family: 4,
        maxPoolSize: 200,
        maxConnecting: 15
    });
    let dataBaseInsertResult,
        returnData = {};
//beírjuk a formadatokat az adatbázisba
    async function insertFormData(postData) {
        try {
            const database = client.db("sunshineDB");
            const rooms = database.collection("bookings");
            dataBaseInsertResult = await rooms.insertOne(postData.formUserData);

            let insertedId = dataBaseInsertResult.insertedId;

            if (insertedId) {
                returnData.successfulDatabaseInsert = true;
            }

            res.send(returnData);
        } finally {
            //dataBaseInsertResult.close();
            res.send({
                successfulDatabaseInsert: false
            });
            await client.close();
        }
    }
    insertFormData(req.body).catch(console.dir);
});
//lekérjük az adatokat az adatbázisból, leadjuk a kliensnek
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
//itt adjuk le a kért adatokat a kliensnek res=respond
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