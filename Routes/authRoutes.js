const express = require('express');
const asyncWrapper = require('../utils/asyncWrapper');
require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const router = express.Router();

// Register route
router.post('/register', asyncWrapper(async (req, res) => {
    let {password} = req.body;

    if(req.body.role === 'admin' || req.body.role === 'manager'){
        return res.status(400).json({message: 'cannot register as a admin or manager, try staff position'});
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);    
    
    const user = new User({...req.body, password:hash});
    await user.save();

    const token = jwt.sign({ id:user._id, role: user.role, name:user.name }, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRY});

   
    res.status(201).json({ message: 'User created successfully', user, token });
}));

// Login route
router.post('/login', async (req, res) => {
    const {userEmail, userPassword} = req.body;
    if(!userEmail, !userPassword){
        return res.status(400).json({msg: "please provide email and password"})
    }
    
    // check is user exist in the db
    const userTemp = await User.find({email: userEmail});
    if(!userTemp){
        return res.status(400).json({ msg: "User Does Not exist"});
    }

    const user = userTemp[0];
    const userInput = userPassword;
    const hash = user.password;
    
    // compare the password of user
    const passwordAuth = await bcrypt.compareSync(userInput, hash, (err,res) => {
        console.log("error while comparing password");
        
    });
    if(!passwordAuth){
        return res.status(400).json({msg: "Please provide correct email and password"});
    }    
    const token = jwt.sign({ id:user._id, role: user.role, name:user.name }, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRY});

    res.status(200).json({success: "true", authToken: token});
});



// Guest route
router.get('/guest', (req, res) => {
    // Handle guest access logic here
    const token = jwt.sign({ id:"6856f906943eea8bf596ffd9", role: "admin", name:"testting" }, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRY});
    res.status(200).json({success: "true", authToken: token});
    
});

module.exports = router;