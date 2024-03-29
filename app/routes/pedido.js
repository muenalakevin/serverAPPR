const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const { getPedidosFecha, getItems ,getItemsAll, getItem,getItem2, createItem, enviarPedido,updateItem, deleteItem} = require('../controllers/pedido')

router.get('/',checkOrigin,JWT, getItems)
router.get('/all/',checkOrigin,JWT, getItemsAll)

router.get('/:_id',checkOrigin,JWT, getItem)
router.get('/2/:_id',checkOrigin,JWT, getItem2)

router.post('/',checkOrigin,JWT, createItem)

router.post('/fecha',checkOrigin,JWT, getPedidosFecha)

router.post('/enviar',checkOrigin,JWT, enviarPedido)

router.patch('/',checkOrigin,JWT, updateItem)


router.post('/delete',checkOrigin,JWT, deleteItem)


module.exports = router