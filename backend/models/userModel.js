const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    role: {
        type: String,
        required: true,
        default: 'student',
        Enumerator: ['student', 'admin']
    }
}, {
    timestamps: true
});

userSchema.statics.addUser = async function(username, password, user_type='student') {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this({ username, password: hashedPassword, user_type });
    return newUser;
}

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect username');

}

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;