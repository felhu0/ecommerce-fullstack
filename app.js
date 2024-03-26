const express = require('express')
const app = express()
const cors = require('cors');
const productsController = require('./server/controllers/productController')
const messagesController = require('./server/controllers/messageController')
const usersController = require('./server/controllers/userController')
const ordersController = require('./server/controllers/orderController')
const  { authenticate } = require('./server/middleware/authenticate')

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors());

//Routes

app.use('/api/products', productsController)
app.use('/api/messages', messagesController)
app.use('/api/auth', usersController)
app.use('/api/orders', authenticate, ordersController)



module.exports = app