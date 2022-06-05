const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json())
app.use(cors())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://legalfist_mcq_db_user:${process.env.DB_PASS}@cluster0.m5ole.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
    try {
        client.connect();
        const questionCollection = client.db("legalFistMCQ").collection("questionCollection");

        app.get('/questions', async (req, res) => {
            const questions = await questionCollection.find().toArray();
            res.send(questions);
        })
    }
    finally {

    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(port, () => {
    console.log("server running on port - ", port);
})