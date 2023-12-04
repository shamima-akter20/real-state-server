const { ObjectId } = require('mongodb');
const { offersCollection } = require('../db/mongodbConnection');

const router = require('express').Router()


router.get('/offers', async(req, res) => {
    try {
        const filter = {}
        const query = req.query;
        if(query.buyerEmail){
            // filter.buyerEmail = query.buyerEmail
            const result = await offersCollection.aggregate([
                {
                    $match: {
                        buyerEmail: query?.buyerEmail
                    }
                },
                  {
                    $lookup: {
                      from: "properties",
                      localField: "propertyId",
                      foreignField: "_id",
                      as: "propertyDetails",
                    },
                  },
                  {
                    $unwind: '$propertyDetails'
                  }
            ]).toArray()
            return res.send(result)
        } else if(query?.status){
            filter.status = query.status
        }
        const result = await offersCollection.find(filter).toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/offers/:id', async(req, res) => {
    try {
        const result = await offersCollection.aggregate([
            {
                $match: {
                    _id: new ObjectId(req.params.id)
                }
            },
              {
                $lookup: {
                  from: "properties",
                  localField: "propertyId",
                  foreignField: "_id",
                  as: "propertyDetails",
                },
              },
              {
                $unwind: '$propertyDetails'
              }
        ]).next()
        res.send(result)
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

router.patch('/offersReject/:id', async(req, res) => {
    try {
       const filter = {propertyId: new ObjectId(req.params.id)}
       const doc = {
        $set: {
            status: 'rejected'
        }
       }

       const result = await offersCollection.updateMany(filter, doc)
       res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/offers', async(req, res) => {
    try {
        const offers = await offersCollection.insertOne({...req.body, propertyId: new ObjectId(req.body?.propertyId)})
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