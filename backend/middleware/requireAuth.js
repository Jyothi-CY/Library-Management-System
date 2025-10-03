const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth =  async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'You must be logged in' });
    }
    const token = authorization.replace('Bearer ', '');
    try {
        const { _id } = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
        const user = await User.findById(_id);
        if (!user) {
            return res.status(401).json({ error: 'You must be logged in' });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'token is required!' });
    }
}

module.exports = requireAuth;