const { usersCollection } = require("../db/mongodbConnection");
const verifyAgent = async (req, res, next)=>{

  const email = req?.decoded?.email;
console.log(email);
  const userData = await usersCollection.findOne({email});
  // console.log(userData?.role !== "admin");
  console.log(userData?.role);
  if (userData?.role == "admin" || userData?.role == "agent") {
    next();
    return 
  }
  res.status(403).send({ message: "unauthorized access" });
}

module.exports = verifyAgent;