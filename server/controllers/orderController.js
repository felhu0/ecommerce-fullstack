const router = require('express').Router()
const { authenticate } = require('../middleware/authenticate');
const { createOrder, getAllOrders, getOrderById } = require('../models/orderModel')


router.post('/', authenticate, createOrder )
router.get('/', authenticate, getAllOrders )
router.get('/:id', authenticate, getOrderById )




module.exports = router;