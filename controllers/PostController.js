const Post = require("../models/Post");

const PostController = {
    async createPost(req, res) {
        try {
            const post = await Post.create({ ...req.body, userId: req.user._id})
            res.status(201).send({message: "Post created", post})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There was a problem creating the post', error })
        }
    },
    async updatePost(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                { ...req.body,  userId: req.user._id},
                {
                  new: true,
                }
            );
            res.status(201).send({message: "Post updated", post})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There was a problem updating the post', error })
        }
    },
    async deletePost(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id);
            res.send({ message: "Product deleted", post });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem deleting the post', error })
        }
    },
    async getPostById(req, res) {
        try {
            const post = await Post.findById(req.params._id);
            res.send({ message: `Post with id ${req.params._id}`, post });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: `There was a problem getting the post with id '${req.params._id}'`, error })
        }
    },
    async getPostsByTitle(req, res) {
        try {
            if (req.params.title.length > 20) {
                    return res.status(400).send("Query too long");
            }
            const title = new RegExp(req.params.title, "i");
            const posts = await Post.find({ title });
            res.send({ message: `Posts with '${req.params.title}' in their title`, posts });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: `There was a problem getting posts with title ${req.params.title}`, error })
        }
    },
}

module.exports = PostController;