const { ObjectId } = require('mongodb');
const { offersCollection } = require('../db/mongodbConnection');

const router = require('express').Router()


router.get('/offers', async(req, res) => {
    try {
        const filter = {}
        const query = req.query;
        if(query.buyerEmail){
            filter.buyerEmail = query.buyerEmail
        }
        const result = await offersCollection.find(filter).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/offers/:id', async(req, res) => {
    try {
        const offer = await offersCollection.findOne({_id: new ObjectId(req.params.id)})
        res.send(offer)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/offers/:id', async(req, res) => {
    try {
        const filter = {_id: new ObjectId(req.params.id)}
        const doc = {
            $set: req.body
        }
        const offers = await offersCollection.updateOne(filter, doc)
        res.send(offers)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/offers', async(req, res) => {
    try {
        const offers = await offersCollection.insertOne(req.body)
        res.send(offers)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.delete('/offers/:id', async(req, res) => {
    try {
        const offers = await offersCollection.deleteOne({_id: new ObjectId(req.params.id)})
        res.send(offers)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;