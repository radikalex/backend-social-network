const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: String,
        user_img: String,
        darkMode: Boolean,
        bio: String,
        role: String,
        followers: [
            {
                type: ObjectId,
                ref: "User",
            },
        ],
        following: [
            {
                type: ObjectId,
                ref: "User",
            },
        ],
        confirmed: Boolean,
        tokens: [],
        postIds: [{ type: ObjectId, ref: "Post" }],
    },
    { timestamps: true }
);

UserSchema.methods.toJSON = function () {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
