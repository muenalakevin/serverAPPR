const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const { login } = require('../controllers/auth')

router.post('/',checkOrigin, login)

module.exports = router
    