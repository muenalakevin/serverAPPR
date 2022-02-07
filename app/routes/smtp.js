const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const {getItem, updateItem,test,resetPassword} = require('../controllers/smtp')

router.get('/',checkOrigin,JWT, getItem)

router.post('/test',checkOrigin,JWT, test)
router.post('/resetPassword', resetPassword)

router.patch('/',checkOrigin,JWT, updateItem)



module.exports = router
