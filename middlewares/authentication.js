const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');

const authentication = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: payload._id, tokens: token });
        if (!user) {
            return res.status(401).send({ message: 'You are not authenticated' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem with the token' })
    }
}

const isAdmin = async(req, res, next) => {
    const admins = ['admin','superadmin'];
    if (!admins.includes(req.user.role)) {
        return res.status(403).send({
            message: 'You do not have permission'
        });
    }
    next();
}

const isPostAuthor = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        if(!post) {
            return res.status(404).send({ message: `No post with id ${req.params._id}` });
        }
        if (post.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: 'This post is not yours' });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem verifying the authorship of the post' })
    }
}

const isCommentAuthor = async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params._id);
        if(!comment) {
            return res.status(404).send({ message: `No comment with id ${req.params._id}` });
        }
        if (comment.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: 'This comment is not yours' });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem verifying the authorship of the comment' })
    }
}

module.exports = { authentication, isAdmin, isPostAuthor, isCommentAuthor }