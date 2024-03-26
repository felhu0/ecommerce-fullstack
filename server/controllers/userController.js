const router = require('express').Router()
const { register, login } = require('../models/userModel')


router.post('/register', register)
router.post('/login', login)



module.exports = router;