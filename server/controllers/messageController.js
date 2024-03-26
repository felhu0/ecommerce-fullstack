const router = require('express').Router()
const { createMessages } = require('../models/messageModel')


router.post('/', createMessages)



module.exports = router;