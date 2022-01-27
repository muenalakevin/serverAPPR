const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const {  getCaja,getCajas,createItem,getCajaFecha,updateItem} = require('../controllers/caja')


router.post('/fecha',checkOrigin,JWT, getCajaFecha)

router.get('/',checkOrigin,JWT, getCaja)
router.get('/all',checkOrigin,JWT, getCajas)
router.post('/',checkOrigin,JWT, createItem)
router.patch('/',checkOrigin,JWT, updateItem)



module.exports = router
