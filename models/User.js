const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    followers: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    tokens: []
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;