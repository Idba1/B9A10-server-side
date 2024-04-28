const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wwse58h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    
    // SpotCollectionFromUSer
    const spotCollection = client.db('spotDB').collection('spot');
    // TouristSpotSection
    const touristSpotSection = client.db('spotDB').collection('touristme');

    // SpotCollectionFromUSer
    app.get('/addspot', async (req, res) => {
      const cursor = spotCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    // TouristSpotSection
    app.get('/alltouristspotsection', async (req, res) => {
      const cursor = touristSpotSection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    // SpotCollectionFromUSer
    app.post('/addspot', async (req, res) => {
      const addSpot = req.body;
      console.log(addSpot);
      const result = await spotCollection.insertOne(addSpot);
      res.send(result);
    })

    // TouristSpotSection
    app.post('/alltouristspotsection', async (req, res) => {
      const TouristSpot = req.body;
      console.log(TouristSpot);
      const result = await touristSpotSection.insertOne(TouristSpot);
      res.send(result);
    })


    // Connect the client to the server	(optional starting in v4.7)

    // Send a ping to confirm a successful connection

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error

  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Euro Journey Server Side')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})