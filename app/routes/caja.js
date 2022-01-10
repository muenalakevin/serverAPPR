const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const {  getCaja,createItem} = require('../controllers/caja')



router.get('/',checkOrigin,JWT, getCaja)
router.post('/',checkOrigin,JWT, createItem)



module.exports = router
