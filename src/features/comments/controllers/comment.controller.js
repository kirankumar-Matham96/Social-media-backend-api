import CommentModel from "../models/comment.model.js";
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

class CommentController {
  createNewComment = (req, res) => {
    const { userId } = req;
    const { postId } = req.params;
    const { content } = req.body;

    if (!postId) {
      throw new CustomErrorHandling("post id is required", 400);
    }

    if (!content) {
      throw new CustomErrorHandling("content is required", 400);
    }

    const { comment, status } = CommentModel.add(userId, postId, content);
    res.status(status).send({
      status: "success",
      message: "comment added successfully",
      comment,
    });
  };

  getAllCommentsRelatedToAPost = (req, res) => {
    const { userId } = req;
    const { postId } = req.params;

    if (!postId) {
      throw new CustomErrorHandling("post id is required", 400);
    }

    const { comments, status } = CommentModel.getAll(userId, postId);
    res.status(status).send({
      status: "success",
      message: "comments retrieved successfully",
      comments,
    });
  };

  updateComment = (req, res) => {
    const { userId } = req;
    const { postId } = req.params;
    const { content } = req.body;

    if (!postId) {
      throw new CustomErrorHandling("post id is required", 400);
    }

    if (!content) {
      throw new CustomErrorHandling("content is required", 400);
    }

    const { comment, status } = CommentModel.update(userId, postId, content);
    res.status(status).send({
      status: "success",
      message: "comment updated successfully",
      comment,
    });
  };

  deleteComment = (req, res) => {
    const { userId } = req;
    const { postId } = req.params;

    if (!postId) {
      throw new CustomErrorHandling("post id is required", 400);
    }

    const { comment, status } = CommentModel.delete(userId, postId);
    res.status(status).send({
      status: "success",
      message: "comment deleted successfully",
      comment,
    });
  };
}

export default CommentController;
