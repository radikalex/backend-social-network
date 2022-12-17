const mongoose = require("mongoose");

const posts = [
    {
        // _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617aa"),
        title: "Seeder post 1",
        content: "Seeder content 1",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617aa"),
        post_img: "",
        likes: [],
        commentIds: [],
    },
    {
        // _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617aa"),
        title: "Seeder post 2",
        content: "Seeder content 2",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617aa"),
        post_img: "",
        likes: [],
        commentIds: [],
    },
];

module.exports = {
    posts,
};
