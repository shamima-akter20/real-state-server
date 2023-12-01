const { ObjectId } = require("mongodb");
const { usersCollection } = require("../db/mongodbConnection");

const router = require("express").Router();

router.get('/users', async(req, res) => {
    try {
        const result = await usersCollection.find().toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/users/:email', async(req, res) => {
    try {
        const user = await usersCollection.findOne({email: req.params.email})
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/users', async(req, res) => {
    try {
        const result = await usersCollection.insertOne(req.body)
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.put('/users/:id', async(req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id)}
        const doc = {
            $set: req.body
        }
        const result = await usersCollection.updateOne(query, doc, {upsert: true})
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/users/:id', async(req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id)}
        
        const doc = {
            $set: req.body
        }
        const result = await usersCollection.updateOne(query, doc)
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.delete('/users/:id', async(req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id)}
        const result = await usersCollection.deleteOne(query)
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;
