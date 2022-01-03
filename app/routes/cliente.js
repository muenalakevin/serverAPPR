const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const {  getItems , getItem, createItem, updateItem, deleteItem} = require('../controllers/cliente')

router.get('/',checkOrigin,JWT, getItems)

router.get('/:_id',checkOrigin,JWT, getItem)

router.post('/',checkOrigin,JWT, createItem)

router.patch('/',checkOrigin,JWT, updateItem)


router.delete('/:_id',checkOrigin,JWT, deleteItem)


module.exports = router
