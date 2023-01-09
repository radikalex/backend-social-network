const mongoose = require("mongoose");

const posts = [
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617b1"),
        content: "Obligatoria revisión cada abril. Im crying por los ojos mios",
        date: "2022-11-26",
        dateCreated: "2022-11-26",
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
        content: "2023\nA ver si acaba esto ya de una vez",
        date: "2023-01-05",
        dateCreated: "2023-01-01",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617af"),
        post_img: "posts_images/default/seederPost2.jpg",
        likes: [mongoose.Types.ObjectId("569ed8269353e9f4c51617ab")],
        commentIds: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617b3"),
        content: "Fallout 4 best game",
        date: "2021-08-01",
        dateCreated: "2021-07-01",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617ac"),
        post_img: "",
        likes: [mongoose.Types.ObjectId("569ed8269353e9f4c51617ab")],
        commentIds: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617b4"),
        content:
            "Spoilers de One Piece\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\nNo es ningún spoiler que es el mejor anime",
        date: "2022-10-13",
        dateCreated: "2022-09-01",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617ab"),
        post_img: "posts_images/default/seederPost3.jpg",
        likes: [
            mongoose.Types.ObjectId("569ed8269353e9f4c51617ae"),
            mongoose.Types.ObjectId("569ed8269353e9f4c51617ab"),
        ],
        commentIds: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617b5"),
        content: "Hoy me he levantado con energía\nVamos!!!!!!!!!!!!",
        date: "2022-11-13",
        dateCreated: "2022-11-13",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617ad"),
        post_img: "",
        likes: [],
        commentIds: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617b6"),
        content: "Que hora es? Cafesito?",
        date: "2022-09-11",
        dateCreated: "2023-03-01",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617f2"),
        post_img: "",
        likes: [
            mongoose.Types.ObjectId("569ed8269353e9f4c51617ae"),
            mongoose.Types.ObjectId("569ed8269353e9f4c51617ab"),
            mongoose.Types.ObjectId("569ed8269353e9f4c51617f1"),
            mongoose.Types.ObjectId("569ed8269353e9f4c51617f2"),
        ],
        commentIds: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617b7"),
        content: "Argentina compeona del mundo papa",
        date: "2023-01-09",
        dateCreated: "2023-01-01",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617f1"),
        post_img: "posts_images/default/seederPost4.png",
        likes: [mongoose.Types.ObjectId("569ed8269353e9f4c51617ab")],
        commentIds: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617b8"),
        content:
            "Hace un mes se jugó el partido bisagra de Argentina desde octavos en adelante. Argentina 2-2 Países Bajos. Uno de los mejores partidos de nuestros mundiales. Se recuerda todo. Desde la previa hasta el post partido. Pase increíble, Dibu, Topo Gigio, declaraciones. Gran recuerdo.",
        date: "2023-01-02",
        dateCreated: "2023-01-02",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617f1"),
        post_img: "",
        likes: [],
        commentIds: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617b9"),
        content:
            "He quedado 17/3/5 con caitlyn\nNo ha servido de nada porque hemos perdido por el jungla, como siempre",
        date: "2022-12-20",
        dateCreated: "2022-12-20",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617ae"),
        post_img: "",
        likes: [],
        commentIds: [],
    },
    {
        _id: mongoose.Types.ObjectId("569ed8269353e9f4c51617ba"),
        content:
            "Espero que esteis preparados...\nY que hayais traído boli\nEl que no estará suspendido 😈",
        date: "2023-01-09",
        dateCreated: "2023-01-09",
        userId: mongoose.Types.ObjectId("569ed8269353e9f4c51617af"),
        post_img: "",
        likes: [],
        commentIds: [],
    },
];

module.exports = {
    posts,
};
