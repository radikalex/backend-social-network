const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const users = [
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617ab"),
        firstName: "Alex",
        lastName: "Jimenez",
        username: "radikalex",
        email: "alex@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        user_img: "users_images/default/seeder1.jpg",
        darkMode: true,
        bio: "Test\nTest 1\nInterest: sports, anime, and videogames\nEnd",
        role: "user",
        followers: [],
        following: [mongoose.Types.ObjectId("569ed8269353e9f4c51617ac")],
        confirmed: true,
        tokens: [],
        postIds: [
            mongoose.Types.ObjectId("569ed8269353e9f4c51617b1"),
            mongoose.Types.ObjectId("569ed8269353e9f4c51617b2"),
        ],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617ac"),
        firstName: "Ivan",
        lastName: "Jimenez",
        username: "voltron",
        email: "ivan@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        user_img: "users_images/default/seeder2.jpg",
        darkMode: false,
        bio: "",
        role: "user",
        followers: [mongoose.Types.ObjectId("569ed8269353e9f4c51617ab")],
        following: [],
        confirmed: true,
        tokens: [],
        postIds: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617ad"),
        firstName: "Josefa",
        lastName: "Alcantud",
        username: "pepa",
        email: "pepa@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        user_img: "users_images/default/seeder3.png",
        darkMode: false,
        bio: "",
        role: "user",
        followers: [],
        following: [],
        confirmed: true,
        tokens: [],
        postIds: [],
    },
];

module.exports = {
    users,
};
