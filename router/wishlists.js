const { ObjectId } = require('mongodb');
const { wishlistsCollection } = require('../db/mongodbConnection');

const router = require('express').Router()

// /wishlists (get all wishlist or query user specific)
router.get('/wishlists', async(req, res) => {
    try {
        const filter = {}
        const query = req.query;
        if(query.userEmail){
            filter.userEmail = query.email
            // console.log(query.email, filter);
        }

        const wishlists = await wishlistsCollection.find(filter).toArray()
        res.send(wishlists)

    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/wishlists/:id', async(req, res) => {
    try {
        const filter = {_id: new ObjectId(req.params.id)}
        const wishlist = await wishlistsCollection.findOne(filter)
        res.send(wishlist)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/wishlists', async(req, res) => {
    try {
        const wishlist = await wishlistsCollection.insertOne(req.body)
        res.send(wishlist)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.delete('/wishlists/:id', async(req, res) => {
    try {
        const wishlist = await wishlistsCollection.deleteOne({_id: new ObjectId(req.params.id)})
        res.send(wishlist)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router;