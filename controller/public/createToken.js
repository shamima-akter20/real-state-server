const { usersCollection } = require("../../db/mongodbConnection");

const jwt = require('jsonwebtoken')

const createToken = async (req, res) => {
  try {
    const query = { email: req.body?.email };
    const user = await usersCollection.findOne(query);

    if ((user && user?.email) !== req.body?.email) {
      return res.status(401).send({ message: "unauthorized access" });
    }

    const token = jwt.sign(req.body, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .send({ message: "token created!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = createToken;