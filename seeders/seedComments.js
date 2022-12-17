const mongoose = require("mongoose");

const comments = [
    {
        // _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617aa"),
        content: "Content comment 1",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617aa"),
        postId: mongoose.Types.ObjectId("569ed8269353e9f4c51617aa"),
        comment_img: "",
        likes: [],
    },
    {
        // _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617aa"),
        content: "Content comment 2",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617aa"),
        postId: mongoose.Types.ObjectId("569ed8269353e9f4c51617aa"),
        comment_img: "",
        likes: [],
    },
];

module.exports = {
    comments,
};
