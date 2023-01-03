const mongoose = require("mongoose");

const comments = [
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617c1"),
        content:
            "Content comment 2 Content comment 2 Content comment 2 Content comment 2",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617ac"),
        postId: mongoose.Types.ObjectId("569ed8269353e9f4c51617b1"),
        date: "2022-12-27",
        likes: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617c2"),
        content: "Content comment 1",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617ad"),
        postId: mongoose.Types.ObjectId("569ed8269353e9f4c51617b1"),
        date: "2022-12-28",
        likes: [],
    },
];

module.exports = {
    comments,
};
