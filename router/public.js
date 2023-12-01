const { getProperties } = require('../controller/public/publicController');
const { propertiesCollection, usersCollection } = require('../db/mongodbConnection');

const router = require('express').Router()

router.get('/properties', getProperties)

router.post('/users', async(req, res) => {
    try {
       const result = await usersCollection.insertOne(req.body)
       res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;