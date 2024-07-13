const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// middleware
// app.use(cors());
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
    // userCollection
    const userCollection = client.db('spotDB').collection('user');

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

    app.get("/addspot/:userEmail", async (req, res) => {
      console.log(req.params.userEmail);
      const result = await spotCollection.find({ userEmail: req.params.userEmail }).toArray();
      res.send(result)
    })
    app.get("/addspot/:_id", async (req, res) => {
      console.log(req.params._id);
      const result = await spotCollection.find({ _id: req.params._id }).toArray();
      res.send(result)
    })


    app.get("/addspot/:_id", async (req, res) => {
      try {
        const id = req.params._id;
        console.log(id);
        const query = { _id: new ObjectId(id) };
        const result = await spotCollection.findOne(query);
        res.send(result);
      } catch (error) {
        console.error("Error fetching spot by ID:", error);
        res.status(500).send("Internal Server Error");
      }
    });



    // // Update
    // app.put('/addspot/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const updatedSpot = req.body;
    //   const query = { _id: new ObjectId(id) };
    //   const updateDocument = {
    //     $set: updatedSpot,
    //   };
    //   const result = await spotCollection.updateOne(query, updateDocument);
    //   res.send(result);
    // });

    // delete
    app.delete('/addspot/:_id', async (req, res) => {
      const id = req.params._id;
      const query = { _id: new ObjectId(id) };
      const result = await spotCollection.deleteOne(query);
      res.send(result);
    });

    // TouristSpotSection
    app.post('/alltouristspotsection', async (req, res) => {
      const TouristSpot = req.body;
      console.log(TouristSpot);
      const result = await touristSpotSection.insertOne(TouristSpot);
      res.send(result);
    })

    // userCollection
    app.post('/user', async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });





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