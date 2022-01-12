const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const {  getCaja,createItem,updateItem} = require('../controllers/caja')



router.get('/',checkOrigin,JWT, getCaja)
router.post('/',checkOrigin,JWT, createItem)
router.patch('/',checkOrigin,JWT, updateItem)



module.exports = router
