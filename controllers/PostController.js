const Post = require("../models/Post");

const PostController = {
    async createPost(req, res) {
        try {
            const post = await Post.create({ content: req.body.content, userId: req.user._id})
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
                { content: req.body.content,  userId: req.user._id},
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
}

module.exports = PostController;