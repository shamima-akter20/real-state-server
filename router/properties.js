const { ObjectId } = require("mongodb");
const { propertiesCollection, paymentsCollection } = require("../db/mongodbConnection");
const verifyToken = require("../middlewares/verifyToken");
const verifyAgent = require("../middlewares/verifyAgent");
const verifyAdmin = require("../middlewares/verifyAdmin");
// console.log(verifyToken);

const router = require("express").Router();

router.get('/properties', async(req, res) => {
    try {
        const filter = {}
        const query = req.query
        if(query.agentEmail){
            filter.agentEmail = query.agentEmail
        }
        const result = await propertiesCollection.find(filter).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/properties/:id', verifyToken, async(req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id)}
        const result = await propertiesCollection.findOne(query)
        console.log(result);
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/boughtProperties/:email', async(req, res) => {
    try {
        const filter = {agentEmail: req.params.email}
        const result = await paymentsCollection.find(filter).toArray()

        // const result = await paymentsCollection.aggregate([
        //     {
        //         $match: {
        //             agentEmail: query?.buyerEmail
        //         }
        //     },
        //       {
        //         $lookup: {
        //           from: "properties",
        //           localField: "propertyId",
        //           foreignField: "_id",
        //           as: "propertyDetails",
        //         },
        //       },
        //       {
        //         $unwind: '$propertyDetails'
        //       }
        // ]).toArray()
         res.send(result)
        // res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/properties', verifyToken, verifyAgent, async(req, res) => {
    try {
        const result = await propertiesCollection.insertOne(req.body)
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.put('/properties/:id', verifyToken, verifyAgent, async(req, res) => {
    try {
        const filter = {_id: new ObjectId(req.params.id)}
        const doc = {
            $set: req.body
        }
        const properties = await propertiesCollection.updateOne(filter, doc, {upsert: true})
        res.send(properties)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/properties/:id', verifyToken, verifyAgent, async(req, res) => {
    try {
        const filter = {_id: new ObjectId(req.params.id)}
        const doc = {
            $set: req.body
        }
        const properties = await propertiesCollection.updateOne(filter, doc)
        res.send(properties)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.delete('/properties/:id', verifyToken, verifyAgent, async(req, res) => {
    try {
        const properties = await propertiesCollection.deleteOne({_id: new ObjectId(req.params.id)})
        res.send(properties)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;
