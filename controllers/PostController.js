const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {
    async getPosts (req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const posts = await Post.find()
                .limit(limit)
                .skip( (page - 1) * limit );
            res.send({ message: "Posts obtained", posts})    
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There was a problem getting users', error })
        }
    },
    async getAllPosts (req, res) {
        try {
            const posts = await Post.find()
                .populate({
                    path: 'userId',
                    select: 'username -_id'
                })
                .populate({
                    path: 'commentIds',
                    select: 'content -_id',
                    populate: {
                        path: 'userId',
                        select: 'username -_id'
                    }
                })
            res.send({ message: "All posts", posts})    
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There was a problem getting all posts', error })
        }
    },
    async createPost(req, res) {
        try {
            const post = await Post.create({ ...req.body, userId: req.user._id})
            await User.findByIdAndUpdate(req.user._id, { $push: {postIds: post._id}})
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
    async giveLike(req, res) {
        try {
            const post = await Post.findById(req.params._id);
            if(post.likes.includes(req.user._id)) {
                return res.status(400).send({ message: "You already have a like to this post, you can't give it another one" });
            }
            post.likes.push(req.user._id);
            post.save();
            res.send({ message: ` 'Like a post' successfully done` })
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: `There was a problem giving a like to a post`, error })
        }
    },
    async removeLike(req, res) {
        try {
            const post = await Post.findById(req.params._id);
            if(!post.likes.includes(req.user._id)) {
                return res.status(400).send({ message: "This post does not have your like" });
            }
            await Post.findByIdAndUpdate(req.params._id, {
                $pull: { likes: req.user._id }
            });
            res.send({ message: ` 'Remove a like from a post' successfully done`})  
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: `There was a problem removing a like from post`, error })
        }
    }
}

module.exports = PostController;