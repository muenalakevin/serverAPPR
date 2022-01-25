const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const {  createItem,getCalificaciones} = require('../controllers/calificacion')


router.post('/',checkOrigin,JWT, createItem)
router.get('/',checkOrigin,JWT, getCalificaciones)



module.exports = router
