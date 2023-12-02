const { ObjectId } = require('mongodb');
const { reviewsCollection } = require('../db/mongodbConnection');

const router = require('express').Router()

router.get('/reviews', async(req, res) => {
    try {
        const filter = {}
        const query = req.query;
        if(query.reviewerEmail){
            filter.reviewerEmail = query.reviewerEmail
        }
        const reviews = await reviewsCollection.find(filter).toArray()
        res.send(reviews)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.post('/reviews', async(req, res) => {
    try {
        const reviews = await reviewsCollection.insertOne(req.body)
        res.send(reviews)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.delete('/reviews/:id', async(req, res) => {
    try {
        const reviews = await reviewsCollection.deleteOne({_id: new ObjectId(req.params.id)})
        res.send(reviews)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;