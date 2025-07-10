const User = require('../models/userModel');
const asyncWrapper = require('../utils/asyncWrapper');
const bcrypt =  require('bcryptjs');

// Create a new user
const createUser = asyncWrapper(async (req, res) => {
    let {password} = req.body;

    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);    
    
    const user = new User({...req.body, password:hash});
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
});

// Get all users
const getUsers = asyncWrapper(async (req, res) => {
    const userData = await User.find();
    
    let user = [];
    for(let i = 0; i< userData.length; i++){
    
        user[i] = { 
            name: userData[i].name,
            email: userData[i].email,
            role: userData[i].role,
            phone: userData[i].phone,
            isActive: userData[i].isActive, 
            password: ""};
    }
    res.status(200).json(user);
});

// Get a single user by ID
const getUserById = asyncWrapper(async (req, res) => {
    const userData = await User.findById(req.params.id);

    if (!userData) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
});

// Update a user by ID
const updateUser = asyncWrapper(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user });
});

// Delete a user by ID
const deleteUser = asyncWrapper(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
});

// Export all controllers together
module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
