const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan')
const port = process.env.PORT || 1212;

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER }:${process.env.DB_PASS}@cluster0.k5sapwk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //  kaj shuru

    const usersCollection = client.db('eliteEstateeiDB').collection('users')
    const propertiesCollection = client.db('eliteEstateeiDB').collection('properties')
    

  /***** user collection routes **/
    app.get('/users', async(req, res)=>{
      try {

        const query  = {}

        const result = await usersCollection.find(query).toArray()
        res.send((result))
        
      } catch (error) {
        res.status(500).send(error.message)
      }
    })

    app.post('/users', async (req, res)=>{
      try {
        const result = await usersCollection.insertOne(req.body)
        res.send(result)
        
      } catch (error) {
        res.status(500).send(error.message)
      }
    })

     /***** properties collection routes **/
     app.get('/properties', async(req, res)=>{
      try {

        const query  = {}

        const result = await propertiesCollection.find(query).toArray()
        res.send((result))
        
      } catch (error) {
        res.status(500).send(error.message)
      }
    })

    app.post('/users', async (req, res)=>{
      try {
        const result = await propertiesCollection.insertOne(req.body)
        res.send(result)
        
      } catch (error) {
        res.status(500).send(error.message)
      }
    })



    






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(err){
    console.log(err);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Boss is sitting')
})

app.listen(port, () => {
    console.log(`I'm sitting on EVEREST${port}`);
})