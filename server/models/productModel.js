const Product = require('../schemas/productSchemas')
const mongoose = require('mongoose')


//Lägga till produkt
exports.createProducts = async (req, res) => {

   try {
    
    const productData = req.body
    if(!productData) {
      res.status(400)
      throw new Error('You need to add products')
    }

    const product = await Product.create( productData )

    if(!product) {
      res.status(500) 
      throw new Error('Something went wrong when creating products') 
    }
    
   
    res.status(201).json(product)

   } catch (err) {
    res.json({ 
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
   }
  
  }

  
  // Hämta alla produkter
  exports.getAllProducts = async (req, res) => {

    try {
      const products = await Product.find()
      res.status(200).json(products)

    } catch (err) {
      res.json({ 
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
      })
      
    }
  }
  

  
  
  //Hämta enskild produkt
  exports.getproductById = async (req, res) => {
    
    try {
      const id = req.params.id
      if(!mongoose.isValidObjectId(id)) {
        res.status(400)
        throw new Error('ObjectId not valid')
      }

      const product = await Product.findById(id)
      if(!product) {
        res.status(404)
        throw new Error('Resource not found')
      }
      res.status(200).json(product)

      
    } catch (err) {
      res.json({ 
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
      })
    }
  }


  //uppdatera produkt
  exports.updateProductById = async (req, res) => {
    try {
      const id = req.params.id
      if(!mongoose.isValidObjectId(id)) {
        res.status(400)
        throw new Error('You need to provide a valid ObjectId')
      }
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true })

      if(!product) {
        res.status(404)
        throw new Error('Resource not found')
      }

      res.status(200).json(product)

    } catch (err) {
      res.json({ 
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
      })
    }
  }


  //ta bort produkt
  exports.deleteProductById = async (req, res) => {
    
    try {
      const id = req.params.id
      if(!mongoose.isValidObjectId(id)) {
        res.status(400)
        throw new Error('ObjectId not valid')
      }

      const product = await Product.findByIdAndDelete(id)

      if(!product) {
        res.status(404)
        throw new Error('Resource not found')
      }

      res.status(200).json(product._id)


    } catch (err) {
      res.json({ 
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
      })
    }
  }



exports.createMessages