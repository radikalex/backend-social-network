const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { unlink } = require("fs/promises");
const path = require("path");

const CommentController = {
    async getCommentsOnPost(req, res) {
        try {
            const post = await Post.findById(req.params.post_id);
            if(!post) {
                return res.status(400).send({ message: `There is no post with id ${req.params.post_id}`})
            }
            const comments = await Comment.find({ postId: req.params.post_id})
            res.status(201).send({message: `Comments in post ${req.params.post_id}`, comments})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There was a problem creating the post', error })
        }
    },
    async createComment(req, res) {
        try {
            const post = await Post.findById(req.params.post_id);
            if(!post) {
                return res.status(400).send({ message: `There is no post with id ${req.params.post_id}`})
            }
            const comment = await Comment.create({ ...req.body, postId: req.params.post_id, userId: req.user._id})
            await Post.findByIdAndUpdate(req.params.post_id, { $push: {commentIds: comment._id}})
            res.status(201).send({message: "Post created", comment})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There was a problem creating the post', error })
        }
    },
    async updateComment(req, res) {
        try {
            const old_comment = await Comment.findById(req.params._id);
            if(!old_comment) {
                return res.status(404).send({ message: `No comment with id ${req.params._id}` })
            }
            const comment = await Comment.findByIdAndUpdate(
                req.params._id,
                { ...req.body,  userId: req.user._id},
                {
                  new: true,
                }
            );
            if ( old_comment.comment_img && comment.comment_img !== old_comment.comment_img ) {
                const dir = path.resolve("./");
                await unlink(path.join(dir, old_comment.comment_img));
            }
            res.status(201).send({message: "Comment updated", comment});
        } catch (error) {
            const dir = path.resolve("./");
            await unlink(path.join(dir, req.body.comment_img));
            console.error(error)
            res.status(500).send({ message: 'There was a problem updating the comment', error })
        }
    },
    async deleteComment(req, res) {
        try {
            const comment = await Comment.findByIdAndDelete(req.params._id);
            if(comment.comment_img) {
                const dir = path.resolve("./");
                await unlink(path.join(dir, comment.comment_img));
            }
            res.send({ message: "Comment deleted", comment });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem deleting the comment', error })
        }
    },
    async giveLike(req, res) {
        try {
            const comment = await Comment.findById(req.params._id);
            if(comment.likes.includes(req.user._id)) {
                return res.status(400).send({ message: "You already have a like to this comment, you can't give it another one" });
            }
            comment.likes.push(req.user._id);
            comment.save();
            res.send({ message: ` 'Like a comment' successfully done` })
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: `There was a problem giving a like to a comment`, error })
        }
    },
    async removeLike(req, res) {
        try {
            const comment = await Comment.findById(req.params._id);
            if(!comment.likes.includes(req.user._id)) {
                return res.status(400).send({ message: "This comment does not have your like" });
            }
            await Comment.findByIdAndUpdate(req.params._id, {
                $pull: { likes: req.user._id }
            });
            res.send({ message: ` 'Remove a comment from a post' successfully done`})  
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: `There was a problem removing a like from comment`, error })
        }
    }
}

module.exports = CommentController;