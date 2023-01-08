const Post = require("../models/Post");
const User = require("../models/User");
const { unlink } = require("fs/promises");
const path = require("path");

const PostController = {
    async getPosts(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const ids = [req.user._id, ...req.user.following];
            const posts = await Post.find({
                date: {
                    $lt: req.query.date,
                },
            })
                .where("userId")
                .in(ids)
                .limit(limit)
                .skip((page - 1) * limit)
                .sort({ date: -1 })
                .populate({
                    path: "userId",
                    select: "username firstName lastName user_img -_id",
                });
            res.send({ message: "Posts obtained", posts });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem getting users",
                error,
            });
        }
    },

    async getPostsCreatedByUser(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const posts = await Post.find({
                date: {
                    $lt: req.query.date,
                },
                userId: req.params._id,
            })
                .limit(limit)
                .skip((page - 1) * limit)
                .sort({ date: -1 })
                .populate({
                    path: "userId",
                    select: "username firstName lastName user_img -_id",
                });
            res.send({ message: "Posts obtained", posts });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem getting posts created by user",
                error,
            });
        }
    },

    async getPostsLikedByUser(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const posts = await Post.find({
                likes: { $elemMatch: { $eq: req.params._id } },
            }).populate({
                path: "userId",
                select: "username firstName lastName user_img -_id",
            });
            res.send({ message: "Posts obtained", posts });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem getting posts created by user",
                error,
            });
        }
    },

    async getPostsQuery(req, res) {
        try {
            const { page = 1, limit = 20 } = req.query;
            const posts = await Post.find({
                content: { $regex: req.query.search, $options: "i" },
                date: {
                    $lt: req.query.date,
                },
            })
                .limit(limit)
                .sort({ date: -1 })
                .populate({
                    path: "userId",
                    select: "username firstName lastName user_img -_id",
                });
            res.send({ message: "Posts obtained", posts });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem getting posts created by user",
                error,
            });
        }
    },

    async getAllPosts(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const posts = await Post.find({
                date: {
                    $lt: req.query.date,
                },
            })
                .limit(limit)
                .skip((page - 1) * limit)
                .sort({ date: -1 })
                .populate({
                    path: "userId",
                    select: "username firstName lastName user_img -_id",
                });
            res.send({ message: "All posts", posts });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem getting all posts",
                error,
            });
        }
    },

    async createPost(req, res) {
        try {
            const post = await Post.create({
                ...req.body,
                dateCreated: req.body.date,
                userId: req.user._id,
            });
            await User.findByIdAndUpdate(req.user._id, {
                $push: { postIds: post._id },
            });
            const postPopulated = await Post.findById(post._id).populate({
                path: "userId",
                select: "username firstName lastName user_img -_id",
            });
            res.status(201).send({
                message: "Post created",
                post: postPopulated,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem creating the post",
                error,
            });
        }
    },
    async updatePost(req, res) {
        try {
            const old_post = await Post.findById(req.params._id);
            if (!old_post) {
                return res
                    .status(404)
                    .send({ message: `No post with id ${req.params._id}` });
            }
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                { ...req.body, userId: req.user._id },
                {
                    new: true,
                }
            ).populate({
                path: "userId",
                select: "username firstName lastName user_img -_id",
            });
            if (
                old_post.post_img &&
                post.post_img !== old_post.post_img &&
                !/default\/.*/gm.test(old_post.post_img)
            ) {
                const dir = path.resolve("./images");
                await unlink(path.join(dir, old_post.post_img));
            }
            res.status(201).send({ message: "Post updated", post });
        } catch (error) {
            const dir = path.resolve("./images");
            await unlink(path.join(dir, req.body.post_img));
            console.error(error);
            res.status(500).send({
                message: "There was a problem updating the post",
                error,
            });
        }
    },
    async deletePost(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id);
            if (post.post_img && !/default\/.*/gm.test(post.post_img)) {
                const dir = path.resolve("./images");
                await unlink(path.join(dir, post.post_img));
            }
            res.send({ message: "Post deleted", post });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem deleting the post",
                error,
            });
        }
    },
    async getPostById(req, res) {
        try {
            const post = await Post.findById(req.params._id).populate({
                path: "userId",
                select: "username firstName lastName user_img -_id",
            });
            res.send({ message: `Post with id ${req.params._id}`, post });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: `There was a problem getting the post with id '${req.params._id}'`,
                error,
            });
        }
    },
    async getPostsByTitle(req, res) {
        try {
            if (req.params.title.length > 20) {
                return res.status(400).send("Query too long");
            }
            const title = new RegExp(req.params.title, "i");
            const posts = await Post.find({ title });
            res.send({
                message: `Posts with '${req.params.title}' in their title`,
                posts,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: `There was a problem getting posts with title ${req.params.title}`,
                error,
            });
        }
    },
    async giveLike(req, res) {
        try {
            const post = await Post.findById(req.params._id).populate({
                path: "userId",
                select: "username firstName lastName user_img -_id",
            });
            if (!post)
                return res.status(400).send({
                    message: "No post found",
                });
            if (post.likes.includes(req.user._id)) {
                return res.status(400).send({
                    message:
                        "You already have a like to this post, you can't give it another one",
                });
            }
            post.likes.push(req.user._id);
            post.save();
            res.send({
                message: ` 'Like a post' successfully done`,
                post,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: `There was a problem giving a like to a post`,
                error,
            });
        }
    },
    async removeLike(req, res) {
        try {
            let post = await Post.findById(req.params._id);
            if (!post)
                return res.status(400).send({
                    message: "No post found",
                });
            if (!post.likes.includes(req.user._id)) {
                return res
                    .status(400)
                    .send({ message: "This post does not have your like" });
            }
            post = await Post.findByIdAndUpdate(
                req.params._id,
                {
                    $pull: { likes: req.user._id },
                },
                { new: true }
            ).populate({
                path: "userId",
                select: "username firstName lastName user_img -_id",
            });
            res.send({
                message: ` 'Remove a like from a post' successfully done`,
                post,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: `There was a problem removing a like from post`,
                error,
            });
        }
    },
};

module.exports = PostController;
