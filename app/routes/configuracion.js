const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const multipart = require('connect-multiparty');
const {  getConfiguracionMesero,getConfiguracionCaja,updateLogo ,getConfiguracionEstilo, updateConfiguracioEstilo,updateConfiguracionCaja, getItem, createItem, updateConfiguracionMesero, deleteItem} = require('../controllers/configuracion')
const path = require('path');
router.get('/mesero', getConfiguracionMesero)
router.get('/caja', getConfiguracionCaja)
router.get('/estilo', getConfiguracionEstilo)
router.patch('/mesero',checkOrigin,JWT, updateConfiguracionMesero)
router.patch('/caja',checkOrigin,JWT, updateConfiguracionCaja)
router.patch('/estilo',checkOrigin,JWT, updateConfiguracioEstilo)
fs= require('fs')
const multipartMiddleware = multipart({
    uploadDir: './uploads'
  });
router.patch('/estilo/image',checkOrigin,JWT,multipartMiddleware, updateLogo)
router.get('/estilo/image',  (req, res)=>{
    b64 =  fs.readFileSync(path.join(__dirname, '/../../public/images/logo.png'), {encoding: 'base64'})
    res.send(b64)
})
router.get('/estilo/image2',  (req, res)=>{
    b64 =  fs.readFileSync(path.join(__dirname, '/../../public/images/banner.png'), {encoding: 'base64'})
    res.send(b64)
})
router.get('/:_id',checkOrigin,JWT, getItem)

router.post('/',checkOrigin,JWT, createItem)

router.patch('/',checkOrigin,JWT, updateConfiguracionMesero)

  
router.delete('/:_id',checkOrigin,JWT, deleteItem)


module.exports = router
