const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.anxcgnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const plantCollection = client.db("plantDataBase").collection("plant");


    //Get Full data from database
    app.get("/plants", async (req, res) => {
      const result = plantCollection.find().toArray()
      res.send(result)
    })

    //Post new plant in database
    app.post("/plants", async (req, res) => {
      const newPlant = req.body
      const result = plantCollection.insertOne(newPlant)
      res.send(result)
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Our Plant Tree Server is running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})