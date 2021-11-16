const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const { getItems , getItem, createItem, updateItem, deleteItem} = require('../controllers/rol')

router.get('/',checkOrigin,JWT, getItems)

router.get('/one',checkOrigin,JWT, getItem)

router.post('/',checkOrigin,JWT, createItem)

router.patch('/',checkOrigin,JWT, updateItem)

router.delete('/:id',checkOrigin,JWT, deleteItem)

module.exports = router
