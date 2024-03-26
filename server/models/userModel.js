const User = require('../schemas/userSchemas')
const jwt = require('jsonwebtoken')
const  mongoose = require('mongoose')
const bcrypt = require('bcrypt')


//registrera användare
exports.register = async (req, res) => {

    try {
    
   
    const { email, password } = req.body
     
     if(!email || !password) {
       res.status(400)
       throw new Error('All fields (email, password) are required.')
     }

  
    
     const hash_password = bcrypt.hashSync(password, 10);
   
     
     const user = await User.create( { email, password: hash_password } )
 
     if(!user) {
       res.status(500) 
       throw new Error('Something went wrong when creating message') 
     }
     
     
     const token = jwt.sign({ email: user.email, _id: user._id}, process.env.JWT_SECRET, { expiresIn: '24h' })
    
     res.status(201).json({ message: "User created successfully", token: token })
 
    } catch (err) {
     res.json({ 
       message: err.message,
       stack: process.env.NODE_ENV === 'development' ? err.stack : null
     })
    }
   
   }
 

//Logga in användare
exports.login = async (req, res) => {

  try {
  
  
  const { email, password } = req.body

  if(!email || !password) {
    res.status(400)
    throw new Error('All fields (email, password) are required.')
  }
  const user = await User.findOne({ email });
   
   if(!user) {
     res.status(401)
     throw new Error('User not found')
   }
   
   const passwordMatch = await user.comparePassword(password);
   if(!passwordMatch) {
    res.status(400)
    throw new Error('Incorrect password')
   }
   
   
   const token = jwt.sign({ email: user.email, _id: user._id}, process.env.JWT_SECRET, { expiresIn: '24h' })
  
   res.status(200).json({ message: "Login successful", token: token })
   

  } catch (err) {
   res.json({ 
     message: err.message,
     stack: process.env.NODE_ENV === 'development' ? err.stack : null
   })
  }
 
 }



