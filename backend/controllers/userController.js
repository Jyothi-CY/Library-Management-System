const UserModel = require("../models/userModel");

const deleteUser = async (req, res) => {
    if (req.user.role !== 'admin') {
        throw Error('You are not authorized to do this action');
    }
    try {
        const user_id = req.body.id;
        await UserModel.findByIdAndDelete(user_id);
        res.json({message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateUser = async (req, res) => {
    if (req.user.role !== 'admin') {
        throw Error('You are not authorized to do this action');
    }
    try {
        const user_id = req.params.id;
        const user = await UserModel.findById(user_id);
        if (req.body.role) {
            user.role = req.body.role;
        }
        const updatedUser = await user.save();
        res.json(updatedUser);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {deleteUser, updateUser};