const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const {  getConfiguracionMesero,getConfiguracionCaja , updateConfiguracionCaja, getItem, createItem, updateConfiguracionMesero, deleteItem} = require('../controllers/configuracion')

router.get('/mesero',checkOrigin,JWT, getConfiguracionMesero)
router.get('/caja',checkOrigin,JWT, getConfiguracionCaja)
router.patch('/mesero',checkOrigin,JWT, updateConfiguracionMesero)
router.patch('/caja',checkOrigin,JWT, updateConfiguracionCaja)

router.get('/:_id',checkOrigin,JWT, getItem)

router.post('/',checkOrigin,JWT, createItem)

router.patch('/',checkOrigin,JWT, updateConfiguracionMesero)


router.delete('/:_id',checkOrigin,JWT, deleteItem)


module.exports = router
