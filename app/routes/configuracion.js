const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const {  getConfiguracionMesero , getItem, createItem, updateConfiguracionMesero, deleteItem} = require('../controllers/configuracion')

router.get('/mesero',checkOrigin,JWT, getConfiguracionMesero)
router.patch('/mesero',checkOrigin,JWT, updateConfiguracionMesero)

router.get('/:_id',checkOrigin,JWT, getItem)

router.post('/',checkOrigin,JWT, createItem)

router.patch('/',checkOrigin,JWT, updateConfiguracionMesero)


router.delete('/:_id',checkOrigin,JWT, deleteItem)


module.exports = router
