const { usersCollection } = require("../db/mongodbConnection");
const verifyAgent = async (req, res, next)=>{

  const email = req?.decoded?.email;
console.log(email);
  const userData = await usersCollection.findOne({email});
//   console.log(userData);
  if (userData?.role !== "admin" || userData?.role !== "agent") {
    return res.status(403).send({ message: "unauthorized access" });
  }
  next();
}

module.exports = verifyAgent;