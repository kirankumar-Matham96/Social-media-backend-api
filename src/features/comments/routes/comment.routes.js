// package import
import express from "express";

// module import
import CommentController from "../controllers/comment.controller.js";
import { ValidationMiddleware } from "../../../middlewares/validation.middleware.js";

// initializing express router
const router = express.Router();

// initializing controller class
const commentController = new CommentController();

// comment routes
router.post(
  "/:id",
  ValidationMiddleware.commentsValidation,
  commentController.createNewComment
);
router.get(
  "/:id",
  ValidationMiddleware.queryParamsValidations,
  commentController.getAllCommentsRelatedToAPost
);
router.put(
  "/:id",
  ValidationMiddleware.commentsValidation,
  commentController.updateComment
);
router.delete("/:id", commentController.deleteComment);

// exporting express router
export default router;
