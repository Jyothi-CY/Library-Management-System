const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
}

router.post('/register', async (req, res) => {
    const { username, password, user_type } = req.body;
    const exsisting_user = await userModel.findOne({ username });
    if (exsisting_user) {
        return res.status(400).json('username already exists');
    }
    const user = await userModel.addUser(username, password, user_type);
    try {
        await user.save();
        const token = createToken(user);
        res.json({user, token});
    } catch(error) {
        res.status(400).json(error);
    }
});

const login = async(req, res) => {
    const {username, password} = req.body;
    try {
        const user = await userModel.login(username, password);
        const token = createToken(user);
        res.json({user, token});
    
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

router.post('/login', login);

router.post('/adminlogin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.login(username, password);
        if (user.role === 'admin') {
            const token = await createToken(user);
            res.status(200).json({ user, token });
        } else {
            throw Error('incorrect user type');
        }
    } catch(error) {
        res.status(400).json({ message: error.message});
    }
});

router.get('/all', async (req, res) => {
    if(req.user.role !== 'admin') {
        throw Error('You are not authorized to do this action');
    }
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.patch('/:id', async (req, res) => {
    if(req.user.role !== 'admin') {
        throw Error('You are not authorized to do this action');
    }
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            throw Error('User not found');
        }
        user.role = req.body.role;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;