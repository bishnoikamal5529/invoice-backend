 require('dotenv');
 const jwt = require('jsonwebtoken');
 const User = require('../models/userModel');
 
 
 async function authorizationMiddleware(req, res, next) {
    const authHeader  = req.get("Authorization");
    
    if(!authHeader){
        return res.status(400).json({msg: "Please Login To Continue"})
    }
    
    // check if token is valid
    if(!authHeader.startsWith("Bearer ")){
        return res.status(400).json({msg: "Please provide valid Auth Token To Continue"})
    }

    // Extract Jwt Token
    const token = authHeader.split(" ")[1];

    
    //Verify Token and Extract Token Values
    jwt.verify(token, process.env.JWT_SECRET,async function(err, decoded) {
        if(err){            
            next(err);
        }
        const {id:userID, role:userRole, name:userName} =  { ... decoded};    

        // check is user exist in the db
        const userData = await User.findById(userID) 
            .then(() => {
                req.user = userData;  
                console.log(userData);
                      
                next();
            }).catch( () => {
                return res.status(400).json({ msg: "User Does Not exist"});
            } )
        
      });
}

module.exports = authorizationMiddleware;
