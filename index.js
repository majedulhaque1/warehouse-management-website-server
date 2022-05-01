const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

//middlewares

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wcp59.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();

        const carCollection = client.db('cardelars').collection('cars');

        app.post('/additem', async (req, res) =>{
            const query = req.body;
            const result = await carCollection.insertOne(query);
            res.send(result);
        })

    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/',(req, res) =>{
    res.send('warehouse management server runing.')
})

app.listen(port, () =>{
    console.log('app is runing on port', port);
})