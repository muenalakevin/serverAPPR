const express = require('express')
const router = express.Router();
const checkOrigin = require('../middleware/origin')
const JWT = require('../middleware/JWT')
const { getItemsadmin, getItems ,getItemsMesero,resetUser, getItem, createItem, searchUsername,searchEmail,updateItem, deleteItem} = require('../controllers/usuario')

router.get('/',checkOrigin,JWT, getItems)
router.get('/admin',checkOrigin,JWT, getItemsadmin)

router.get('/mesero',checkOrigin,JWT, getItemsMesero)

router.get('/:_id',checkOrigin,JWT, getItem)

router.post('/',checkOrigin,JWT, createItem)

router.post('/resetUser',resetUser)

router.post('/searchUsername',checkOrigin,JWT, searchUsername)



router.post('/searchEmail',checkOrigin,JWT, searchEmail)

router.patch('/',checkOrigin,JWT, updateItem)


router.delete('/:_id',checkOrigin,JWT, deleteItem)


module.exports = router
