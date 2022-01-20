const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const {  getItems , getItem,getItemsCaja, createItem, updateItem, deleteItem} = require('../controllers/comprobante')

router.get('/',checkOrigin,JWT, getItems)

router.get('/:_id',checkOrigin,JWT, getItem)

router.get('/caja/:_id',checkOrigin,JWT, getItemsCaja)

router.post('/',checkOrigin,JWT, createItem)

router.patch('/',checkOrigin,JWT, updateItem)


router.delete('/:_id',checkOrigin,JWT, deleteItem)


module.exports = router
