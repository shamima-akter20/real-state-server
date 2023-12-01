require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k5sapwk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const usersCollection = client.db("eliteEstateDB").collection("users");
const propertiesCollection = client.db("eliteEstateDB").collection("properties");
const reviewsCollection = client.db("eliteEstateDB").collection("reviews");
const offersCollection = client.db("eliteEstateDB").collection("offers");
const wishlistsCollection = client.db("eliteEstateDB").collection("wishlists");
const paymentsCollection = client.db("eliteEstateDB").collection("payments");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  client,
  run,
  usersCollection,
  propertiesCollection,
  reviewsCollection,
  offersCollection,
  wishlistsCollection,
  paymentsCollection
};