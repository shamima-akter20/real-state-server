const { ObjectId } = require("mongodb");
const { paymentsCollection, offersCollection } = require("../db/mongodbConnection");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// console.log(process.env.STRIPE_SECRET_KEY);
const router = require("express").Router();

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { price } = req.body;
    console.log(price);
    console.log(req.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: "usd",
      payment_method_types: ['card']
    
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send("server error");
    console.log(error);
  }
});

router.post('/payments', async(req, res) => {
    try {
        const filter = {_id: new ObjectId(req.body.offerId)}
        const doc = {
            $set: {
                status: 'bought',
                transactionId: req.body?.transactionId
            }
        }
        offersCollection.updateOne(filter, doc)
        const result = await paymentsCollection.insertOne({...req.body, propertyId: new ObjectId(req.body.propertyId)})
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;
