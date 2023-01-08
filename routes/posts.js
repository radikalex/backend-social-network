const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const {
    authentication,
    isPostAuthor,
} = require("../middlewares/authentication");
const validateBodyParams = require("../middlewares/validateBodyParams");
const { check } = require("express-validator");
const { uploadPostImages } = require("../middlewares/upload");

router.get("/getPosts", authentication, PostController.getPosts);
router.get("/getPostsCreatedByUser/:_id", PostController.getPostsCreatedByUser);
router.get("/getPostsLikedByUser/:_id", PostController.getPostsLikedByUser);
router.get("/getPostsQuery", PostController.getPostsQuery);
router.get("/getAllPosts", PostController.getAllPosts);
router.get("/getPostById/:_id", PostController.getPostById);
router.get("/getPostsByTitle/:title", PostController.getPostsByTitle);

router.post(
    "/",
    uploadPostImages.single("post_img"),
    [check("date", "The date cant be empty").notEmpty(), validateBodyParams],
    authentication,
    PostController.createPost
);

router.put(
    "/id/:_id",
    authentication,
    isPostAuthor,
    uploadPostImages.single("post_img"),
    PostController.updatePost
);
router.put("/giveLike/:_id", authentication, PostController.giveLike);
router.put("/removeLike/:_id", authentication, PostController.removeLike);

router.delete(
    "/id/:_id",
    authentication,
    isPostAuthor,
    PostController.deletePost
);

module.exports = router;
