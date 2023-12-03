const { ObjectId } = require("mongodb");
const { reviewsCollection } = require("../db/mongodbConnection");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.get("/reviews", async (req, res) => {
  try {
    const filter = {};
    const query = req.query;
    if (query.reviewerEmail) {
      // filter.reviewerEmail = query.reviewerEmail
      const result = await reviewsCollection
        .aggregate([
          {
            $match: {
              reviewerEmail: query.reviewerEmail,
            },
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
          
        ])
        .toArray();

    //   console.log("aggrigate");

      return res.send(result);
    }
    const reviews = await reviewsCollection.find(filter).toArray();
    res.send(reviews);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/reviews", verifyToken, async (req, res) => {
  try {
    const reviews = await reviewsCollection.insertOne({
      ...req.body,
      propertyId: new ObjectId(req.body.propertyId),
    });
    res.send(reviews);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/reviews/:id", verifyToken, async (req, res) => {
  try {
    const reviews = await reviewsCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.send(reviews);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
