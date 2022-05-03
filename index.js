const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        app.get('/additem/:Id', async (req, res) =>{
            const id = req.params.Id;
            const query = {_id : ObjectId(id)};
            const result = await carCollection.findOne(query);
            console.log(result);
            res.send(result);
        })
        app.put('/additem/:id', async (req, res) =>{
            const id = req.params.id;
            console.log(id);
            const updatedItem = req.body;
            console.log(updatedItem);
            const filter = {_id : ObjectId(id)};
            const options = { upsert : true};
            const updatedDoc = {
                $set:{
                    quantity : updatedItem.quantity
                }
            }
            const result = await carCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })
        app.get('/additem', async (req, res) =>{
            const query = {};
            const cursor = carCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/additem', async (req, res) =>{
            const query = req.body;
            const result = await carCollection.insertOne(query);
            res.send(result);
        })
        app.delete('/additem/:id', async (req, res) =>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const result = await carCollection.deleteOne(query);
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