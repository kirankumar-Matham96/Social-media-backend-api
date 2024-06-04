// package import
import express from "express";

// module import
import CommentController from "../controllers/comment.controller.js";

// initializing express router
const router = express.Router();

// initializing controller class
const commentController = new CommentController();

// comment routes
router.post("/:id", commentController.createNewComment);
router.get("/:id", commentController.getAllCommentsRelatedToAPost);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

// exporting express router
export default router;
