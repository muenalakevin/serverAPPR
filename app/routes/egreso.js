const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const {  createItem} = require('../controllers/egreso')



router.post('/',checkOrigin,JWT, createItem)



module.exports = router
