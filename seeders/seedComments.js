const mongoose = require("mongoose");

const comments = [
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617c1"),
        content: "Espabila",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617ac"),
        postId: mongoose.Types.ObjectId("569ed8269353e9f4c51617b1"),
        date: "2022-11-27",
        dateCreated: "2022-11-26",
        likes: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617c2"),
        content: "Lo recomiendas?",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617ad"),
        postId: mongoose.Types.ObjectId("569ed8269353e9f4c51617b1"),
        date: "2022-12-28",
        dateCreated: "2022-12-28",
        likes: [mongoose.Types.ObjectId("569ed8269353e9f4c51617ab")],
    },
];

module.exports = {
    comments,
};
