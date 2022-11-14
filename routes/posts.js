const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const { authentication, isPostAuthor } = require('../middlewares/authentication');

router.get("/getPostById/:_id", PostController.getPostById);
router.get("/getPostsByTitle/:title", PostController.getPostsByTitle);
router.post("/", authentication, PostController.createPost);
router.put("/id/:_id", authentication, isPostAuthor, PostController.updatePost);
router.delete("/id/:_id", authentication, isPostAuthor, PostController.deletePost);

module.exports = router;