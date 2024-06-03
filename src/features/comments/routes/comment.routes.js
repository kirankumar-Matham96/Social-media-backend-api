import express from "express";
import CommentController from "../controllers/comment.controller.js";

const router = express.Router();

const commentController = new CommentController();

router.post("/", commentController.createNewComment);
router.get("/:postId", commentController.getAllCommentsRelatedToAPost);
router.put("/:postId", commentController.updateComment);
router.delete("/:postId", commentController.deleteComment);

export default router;