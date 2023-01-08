const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
    {
        content: { type: String, index: true },
        date: Date,
        dateCreated: Date,
        userId: {
            type: ObjectId,
            ref: "User",
        },
        post_img: String,
        likes: [
            {
                type: ObjectId,
                ref: "User",
            },
        ],
        commentIds: [{ type: ObjectId, ref: "Comment" }],
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
