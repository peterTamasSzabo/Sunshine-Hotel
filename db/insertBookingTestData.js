const {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);


async function insertData() {
    try {
        const database = client.db("sunshineDB");
        const bookings = database.collection("bookings");
        // create an array of documents to insert
        const docs = [
            {
                "firstName": "Jenő",
                "lastName": "Sotkovszki",
                "numberOfGuests": 3,
                "dateOfArrival": "2023-7-2",
                "dateOfDeparture": "2023-7-15",
                "room": "Szilvia",
                "comment": "Hozzuk Bugsit is, a kutyánkat!!!!"
            },
            {
                "firstName": "Anna",
                "lastName": "Gyergyó",
                "numberOfGuests": 5,
                "dateOfArrival": "2023-8-11",
                "dateOfDeparture": "2023-8-13",
                "room": "Szilvia",
                "comment": "Hegedülök."
            },
            {
                "firstName": "Gábor",
                "lastName": "Andrássy",
                "numberOfGuests": 1,
                "dateOfArrival": "2023-7-4",
                "dateOfDeparture": "2023-7-8",
                "room": "Anna",
                "comment": "Kérem ne zavarjanak!"
            },
            {
                "firstName": "Tibor",
                "lastName": "Markó",
                "numberOfGuests": 2,
                "dateOfArrival": "2023-9-10",
                "dateOfDeparture": "2023-9-23",
                "room": "Luca",
                "comment": "Szeretnénk kérni gyertyát."
            },
            {
                "firstName": "Helga",
                "lastName": "Kalmár",
                "numberOfGuests": 1,
                "dateOfArrival": "2023-9-6",
                "dateOfDeparture": "2023-9-15",
                "room": "Kata",
                "comment": "Nincs mit mondanom, köszönöm."
            }
        ];

        // this option prevents additional documents from being inserted if one fails
        const options = {ordered: true};
        const result = await bookings.insertMany(docs, options);
        console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        await client.close();
    }
}

insertData().catch(console.dir);