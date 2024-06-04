// module imports
import CommentModel from "../models/comment.model.js";
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

/**
 * This class contains the functionalities to create, retrieve, update and delete a comment.
 */
class CommentController {
  /**
   * controller function to create a new comment.
   * throws error if any parameter is missing.
   *
   * parameters:
   *   userId: logged in user id extracted from request.
   *   id: post id extracted from request params.
   *   content: comment content extracted from request body.
   */
  createNewComment = (req, res) => {
    // extracting the data from the request
    const { userId } = req;
    const { id } = req.params;
    const { content } = req.body;

    // if post id is not passed
    if (!id) {
      throw new CustomErrorHandling("post id is required", 400);
    }

    // if post content is not passed
    if (!content) {
      throw new CustomErrorHandling("content is required", 400);
    }

    // passing the details to model function
    const { comment, status } = CommentModel.add(userId, id, content);

    // sending response
    res.status(status).send({
      status: "success",
      message: "comment added successfully",
      comment,
    });
  };

  /**
   * controller function to create a new comment.
   * throws error if any parameter is missing.
   *
   * parameters:
   *   userId: logged in user id extracted from request.
   *   id: post id extracted from request params.
   */
  getAllCommentsRelatedToAPost = (req, res) => {
    // extracting the data from the request
    const { userId } = req;
    const { id } = req.params;

    // if post id is not passed
    if (!id) {
      throw new CustomErrorHandling("post id is required", 400);
    }

    // passing the details to model function
    const { comments, status } = CommentModel.getAll(userId, id);

    // sending response
    res.status(status).send({
      status: "success",
      message: "comments retrieved successfully",
      comments,
    });
  };

  /**
   * controller function to update comment content.
   * throws error if any parameter is missing.
   *
   * parameters:
   *   userId: logged in user id extracted from request.
   *   id: post id extracted from request params.
   *   content: comment content extracted from request body.
   */
  updateComment = (req, res) => {
    // extracting the data from the request
    const { userId } = req;
    const { id } = req.params;
    const { content } = req.body;

    // if post id is not passed
    if (!id) {
      throw new CustomErrorHandling("post id is required", 400);
    }

    if (!content) {
      throw new CustomErrorHandling("content is required", 400);
    }

    // passing the details to model function
    const { comment, status } = CommentModel.update(userId, id, content);

    // sending response
    res.status(status).send({
      status: "success",
      message: "comment updated successfully",
      comment,
    });
  };

  /**
   * controller function to delete comment.
   * throws error if any parameter is missing.
   *
   * parameters:
   *   userId: logged in user id extracted from request.
   *   id: post id extracted from request params.
   */
  deleteComment = (req, res) => {
    // extracting the data from the request
    const { userId } = req;
    const { id } = req.params;

    // if post id is not passed
    if (!id) {
      throw new CustomErrorHandling("post id is required", 400);
    }

    // passing the details to model function
    const { comment, status } = CommentModel.delete(userId, id);

    // sending response
    res.status(status).send({
      status: "success",
      message: "comment deleted successfully",
      comment,
    });
  };
}

// exporting the class
export default CommentController;
