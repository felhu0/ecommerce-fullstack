const Order = require('../schemas/orderSchemas')
const Product = require('../schemas/productSchemas')
const mongoose = require('mongoose')

//skapa order
exports.createOrder = async (req, res) => {
    try {
     
     const { products } = req.body
     const user = req.user

     let totalPrice = 0;

      // Beräkna totalpriset baserat på produkterna och deras kvantiteter
      for (const item of products) {
        const product = await Product.findById(item.product);
        console.log('product:', product)
        if (!product) {
            return res.status(404).json({ message: `Product with ID ${item.product} not found` });
        }
        totalPrice += product.price * item.quantity;
    }

     if(!products || !totalPrice === undefined) {
       res.status(400)
       throw new Error('You need create order')
     }
     
     
     const order = await Order.create( { user: user._id, products, totalPrice } )
     
     console.log(order)
     if(!order) {
       res.status(500) 
       throw new Error('Something went wrong when creating order') 
     }
     
    
     res.status(201).json({message: "Order created successfully", order: order})
  
    } catch (err) {
     res.json({ 
       message: err.message,
       stack: process.env.NODE_ENV === 'development' ? err.stack : null
     })
    }
   
   }


   // Hämta alla ordrar
  exports.getAllOrders = async (req, res) => {

    try {

      const userId = req.user._id;
      
      if(!mongoose.isValidObjectId(userId)) {
        res.status(400)
        throw new Error('ObjectId not valid')
      }

      const orders = await Order.find({ user: userId }).populate('products.product').exec();
     
    
      if(!orders) {
        res.status(401)
        throw new Error('No orders found')
      }
     

      res.status(200).json(orders)

    } catch (err) {
      res.json({ 
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
      })
      
    }
  }
  

  //Hämta enskild order
  exports.getOrderById = async (req, res) => {
    
    try {
      const id = req.params.id
      
      if(!mongoose.isValidObjectId(id)) {
        res.status(400)
        throw new Error('ObjectId not valid')
      }

      const order = await Order.findById(id).populate('products.product').exec()
      if(!order) {
        res.status(404)
        throw new Error('Resource not found')
      }
      res.status(200).json(order)

      
    } catch (err) {
      res.json({ 
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
      })
    }
  }

