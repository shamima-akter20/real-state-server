const getAllUsers = require('../controller/users/getAllUser')

const router = require('express').Router()

router.get('/users', getAllUsers)

module.exports = router;