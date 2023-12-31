const { usersCollection } = require("../db/mongodbConnection");

const verifyAdmin = async (req, res, next) => {
  const email = req?.decoded?.email;
  const userData = await usersCollection.findOne({email});
//   console.log(userData);
  if (userData?.role !== "admin") {
    return res.status(403).send({ message: "unauthorized access" });
  }
  next();
};

module.exports = verifyAdmin;
