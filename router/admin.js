const { getAllUsers } = require('../controller/admin/adminController');

const router = require('express').Router()

router.get('/users', getAllUsers)

module.exports = router;