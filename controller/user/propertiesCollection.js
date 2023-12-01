// const getProperties = async(req, res)=>{
//     try {
//         const result = await 
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// }

const { usersCollection } = require("../../db/mongodbConnection");

const getUserByParams = async (req, res)=>{
    const email = req.params?.email;
    const result = await usersCollection.findOne(email)
    res.send(result)
}

module.exports = {getUserByParams}