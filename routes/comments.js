const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const {
    authentication,
    isCommentAuthor,
} = require("../middlewares/authentication");

router.get("/:post_id", CommentController.getCommentsOnPost);

router.post("/:post_id", authentication, CommentController.createComment);

router.put(
    "/:_id",
    authentication,
    isCommentAuthor,
    CommentController.updateComment
);
router.put("/giveLike/:_id", authentication, CommentController.giveLike);
router.put("/removeLike/:_id", authentication, CommentController.removeLike);

router.delete(
    "/:_id",
    authentication,
    isCommentAuthor,
    CommentController.deleteComment
);

module.exports = router;
