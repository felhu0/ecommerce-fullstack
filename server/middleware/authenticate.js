const jwt = require('jsonwebtoken');
const User = require('../schemas/userSchemas')

exports.authenticate = async (req, res, next) => {
    
    
    try {
        const header = req.headers.authorization;
        
        if(!header) {
            return res.status(400).json({ message: 'You need to authenticate' })
        }

        const token = header.split(' ')[1]; 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        

        const user = await User.findById(decoded._id);
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
       
        next();
    } catch (err) {
        res.json({ 
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : null
          })
    }
};
