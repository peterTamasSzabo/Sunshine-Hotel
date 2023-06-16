const {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

async function insertData() {
    try {
        const database = client.db("sunshineDB");
        const rooms = database.collection("rooms");
        // create an array of documents to insert
        const docs = [
            {
                "name": "Szilvia",
                "beds": [
                    {
                        "type": "single"
                    },
                    {
                        "type": "queen"
                    }
                ],
                "occupied": false
            },
            {
                "name": "Anna",
                "beds": [
                    {
                        "type": "single"
                    },
                    {
                        "type": "single"
                    },
                    {
                        "type": "queen"
                    }
                ],
                "occupied": true
            },
            {
                "name": "Luca",
                "beds": [
                    {
                        "type": "single"
                    },
                    {
                        "type": "single"
                    }
                ]
            },
            {
                "name": "Kata",
                "beds": [{
                    "type": "queen"
                }],
                "occupied": false
            },
            {
                "name": "Liza",
                "beds": [
                    {
                        "type": "single"
                    },
                    {
                        "type": "single"
                    },
                    {
                        "type": "single"
                    },
                    {
                        "type": "single"
                    }
                ],
                "occupied": true
            }
        ];

        // this option prevents additional documents from being inserted if one fails
        const options = {ordered: true};
        const result = await rooms.insertMany(docs, options);
        console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        await client.close();
    }
}

insertData().catch(console.dir);
