const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const {  getItemsCaja,createItem} = require('../controllers/egreso')


router.get('/caja/:_id',checkOrigin,JWT, getItemsCaja)
router.post('/',checkOrigin,JWT, createItem)



module.exports = router
