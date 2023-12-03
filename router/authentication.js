const express = require("express");
const { usersCollection } = require("../db/mongodbConnection");
const jwt = require('jsonwebtoken');

const router = express.Router()

router.post("/createToken", async (req, res) => {
    try {

      const token = jwt.sign(req.body, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ message: "token created!" });
    } catch (error) {
      res.status(500).send(error.message);
      console.log(error);
    }
  });

  router.delete('/deleteToken', (req, res)=>{
    res.clearCookie('token')
  })

  module.exports = router;