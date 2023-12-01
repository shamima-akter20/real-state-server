const { ObjectId } = require("mongodb");
const { propertiesCollection } = require("../db/mongodbConnection");

const router = require("express").Router();

router.get('/properties', async(req, res) => {
    try {
        const result = await propertiesCollection.find().toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/properties/:id', async(req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id)}
        const result = await propertiesCollection.findOne(query)
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/properties', async(req, res) => {
    try {
        const result = await propertiesCollection.insertOne(req.body)
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router;
