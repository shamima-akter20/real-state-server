const { propertiesCollection } = require("../../db/mongodbConnection")

const getProperties = async(req, res) => {
    try {
        const result = await propertiesCollection.find().toArray()
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {getProperties,}