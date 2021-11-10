const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const { getItems , getItem, createItem, updateItem, deleteItem} = require('../controllers/usuario')

router.get('/',checkOrigin, getItems)

router.get('/:id',checkOrigin, getItem)

router.post('/',checkOrigin, createItem)

router.patch('/',checkOrigin, updateItem)

router.delete('/:id',checkOrigin, deleteItem)

module.exports = router
