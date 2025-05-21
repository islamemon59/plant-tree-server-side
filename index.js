const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.anxcgnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const plantCollection = client.db("plantDataBase").collection("plant");

    //Get single data from database
    app.get("/plants/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await plantCollection.findOne(query);
      res.send(result);
    });

    app.get("/plant/:email", async (req, res) => {
      const email = req.params.email
      const filter = {email: email}
      const result = await plantCollection.find(filter).toArray()
      res.send(result)
    })

    //Get Full data from database
    app.get("/plants", async (req, res) => {
      const result = await plantCollection.find().toArray();
      res.send(result);
    });

    //Post new plant in database
    app.post("/plants", async (req, res) => {
      const newPlant = req.body;
      console.log(newPlant);
      const result = await plantCollection.insertOne(newPlant);
      res.send(result);
    });

    //Update plant data in database
    app.put("/plants/:id", async (req, res) => {
      const id = req.params.id
      const updatedData = req.body
      const filter = {_id: new ObjectId(id)}
      const updateDoc = {
        $set: updatedData
      }
      const result = await plantCollection.updateOne(filter, updateDoc)
      res.send(result)
    })

    //Delete plant data from database
    app.delete("/plants/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await plantCollection.deleteOne(query)
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Our Plant Tree Server is running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
