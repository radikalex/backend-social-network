const mongoose = require("mongoose");

const users = [
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617aa"),
        username: "admin",
        email: "admin@admin.com",
        password: "",
        user_img: "",
        role: "admin",
        followers: [],
        following: [],
        confirmed: true,
        tokens: [],
        postIds: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617ab"),
        username: "alex",
        email: "alex@email.com",
        password: "",
        user_img: "",
        role: "user",
        followers: [],
        following: [],
        confirmed: true,
        tokens: [],
        postIds: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617ac"),
        username: "ivan",
        email: "ivan@email.com",
        password: "",
        user_img: "",
        role: "user",
        followers: [],
        following: [],
        confirmed: false,
        tokens: [],
        postIds: [],
    },
];

module.exports = {
    users,
};
