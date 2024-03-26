const Message = require('../schemas/messageSchemas')



//Lägga till message
exports.createMessages = async (req, res) => {

    try {
    
    
    const { name, email, message } = req.body
     
     if(!name || !email || !message) {
       res.status(400)
       throw new Error('All fields (name, email, message) are required.')
     }
     
    
     const messages = await Message.create( req.body )
 
     if(!messages) {
       res.status(500) 
       throw new Error('Something went wrong when creating message') 
     }
     
    
     res.status(200).json({ message: "Message sent successfully" })
 
    } catch (err) {
     res.json({ 
       message: err.message,
       stack: process.env.NODE_ENV === 'development' ? err.stack : null
     })
    }
   
   }
 