const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { comments } = require("./seedComments");
const { posts } = require("./seedPosts");
const { users } = require("./seedUsers");
require("dotenv").config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Seeders: Database connected successfully");
    })
    .catch((err) => {
        console.log("Seeders: Error starting database", err);
        process.exit(1);
    });

const deletePreviousDataInDB = async () => {
    await Post.deleteMany();
    await User.deleteMany();
    await Comment.deleteMany();
};

const seedDB = async () => {
    await deletePreviousDataInDB();
    await Post.insertMany(posts);
    await User.insertMany(users);
    await Comment.insertMany(comments);
};

seedDB().then(() => {
    console.log("Seeders: Done");
    mongoose.connection.close();
});
