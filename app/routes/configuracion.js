const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const {  getConfiguracionMesero,getConfiguracionCaja ,getConfiguracionEstilo, updateConfiguracioEstilo,updateConfiguracionCaja, getItem, createItem, updateConfiguracionMesero, deleteItem} = require('../controllers/configuracion')

router.get('/mesero', getConfiguracionMesero)
router.get('/caja', getConfiguracionCaja)
router.get('/estilo', getConfiguracionEstilo)
router.patch('/mesero',checkOrigin,JWT, updateConfiguracionMesero)
router.patch('/caja',checkOrigin,JWT, updateConfiguracionCaja)
router.patch('/estilo',checkOrigin,JWT, updateConfiguracioEstilo)

router.get('/:_id',checkOrigin,JWT, getItem)

router.post('/',checkOrigin,JWT, createItem)

router.patch('/',checkOrigin,JWT, updateConfiguracionMesero)


router.delete('/:_id',checkOrigin,JWT, deleteItem)


module.exports = router
