const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const { authentication, isPostAuthor } = require('../middlewares/authentication');
const validateBodyParams = require("../middlewares/validateBodyParams");
const { check } = require("express-validator");
const { uploadPostImages } = require('../middlewares/upload');

router.get("/getPosts", PostController.getPosts);
router.get("/getAllPosts", PostController.getAllPosts);
router.get("/getPostById/:_id", PostController.getPostById);
router.get("/getPostsByTitle/:title", PostController.getPostsByTitle);

router.post("/", uploadPostImages.single('post_img'), [
    check("title", "The title cant be empty").notEmpty(),
    check("content", "The content cant be empty").notEmpty(),
    validateBodyParams
], authentication, PostController.createPost);

router.put("/id/:_id", authentication, isPostAuthor, uploadPostImages.single('post_img'), PostController.updatePost);
router.put("/giveLike/:_id", authentication, PostController.giveLike);
router.put("/removeLike/:_id", authentication, PostController.removeLike);

router.delete("/id/:_id", authentication, isPostAuthor, PostController.deletePost);

module.exports = router;