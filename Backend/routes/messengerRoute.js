const router = require('express').Router();
const { getFriends, messegeUploadDB, messegeGet, imageMessegeSend } = require('../controller/messengerController')
const { authMiddlewares } = require('../middleware/authMiddleware')

router.get('/get-friends',authMiddlewares,getFriends)
router.post('/send-messege', authMiddlewares, messegeUploadDB)
router.get('/get-messege/:id', authMiddlewares, messegeGet)
router.post('/image-messege-send',authMiddlewares,imageMessegeSend)


module.exports = router