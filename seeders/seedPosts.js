const mongoose = require("mongoose");

const posts = [
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617b1"),
        content: "Im crying por los ojos mios",
        date: "2022-12-26",
        dateCreated: "2022-12-26",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617ab"),
        post_img: "posts_images/default/seederPost1.jpg",
        likes: [],
        commentIds: [
            mongoose.Types.ObjectId("569ed8269353e9f4c51617c1"),
            mongoose.Types.ObjectId("569ed8269353e9f4c51617c2"),
        ],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617b2"),
        content: "Seeder content 2",
        date: "2022-12-23",
        dateCreated: "2022-12-22",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617ab"),
        post_img: "posts_images/default/seederPost2.jpg",
        likes: [],
        commentIds: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617b3"),
        content: "Seeder content 3",
        date: "2021-08-01",
        dateCreated: "2021-08-01",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617ac"),
        post_img: "",
        likes: [],
        commentIds: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617b4"),
        content: "Seeder content 4",
        date: "2022-11-13",
        dateCreated: "2022-11-13",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617ad"),
        post_img: "",
        likes: [],
        commentIds: [],
    },
];

module.exports = {
    posts,
};
