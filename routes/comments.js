const express = require('express');
const router = express.Router()
const CommentController = require('../controllers/CommentController');
const { authentication, isCommentAuthor } = require('../middlewares/authentication');


router.get("/:post_id", CommentController.getCommentsOnPost)
router.post("/:post_id", authentication, CommentController.createComment)
router.put("/:_id", authentication, isCommentAuthor, CommentController.updateComment)
router.delete("/:_id", authentication, isCommentAuthor, CommentController.deleteComment)

module.exports = router;