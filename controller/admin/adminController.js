const { usersCollection } = require("../../db/mongodbConnection");


const getAllUsers = async (req, res) => {
  try {
    const query = {};
    const result = await usersCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getAllUsers };
