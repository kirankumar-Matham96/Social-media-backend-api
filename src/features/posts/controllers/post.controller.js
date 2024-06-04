// module imports
import PostModel from "../models/post.model.js";
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

/**
 * This controller class contains the functionalities to create, retrieve, update and delete post.
 */
class PostController {
  /**
   * controller function to create a new post.
   * throws error if any parameter is missing.
   */
  createPost = (req, res) => {
    // extracting the data from the request
    const { caption } = req.body;
    const imagePath = req.file.filename;
    const { userId } = req.userId;

    // if post caption is not passed
    if (!caption) {
      throw new CustomErrorHandling("caption is required", 400);
    }

    // if post image is not passed
    if (!imagePath) {
      throw new CustomErrorHandling("image is required", 400);
    }

    // passing the details to model function
    const { post, status } = PostModel.add(userId, caption, imagePath);

    // sending response
    res
      .status(status)
      .send({ status: "success", message: "post created successfully", post });
  };

  /**
   * controller function to retrieve all posts
   * filters the posts by caption if passed in the query
   * can change pagination settings by passing offset and limit query params
   */
  getAllPosts = (req, res) => {
    // extracting caption from the request query
    const { caption, offset, limit } = req.query;

    // passing the details to model function
    const { posts, status } = PostModel.getAll(caption, offset, limit);

    // sending response
    res.status(status).send({
      status: "success",
      message: "posts retrieved successfully",
      posts,
    });
  };

  /**
   * controller function to create a new post.
   * throws error if any parameter is missing.
   */
  getPostById = (req, res) => {
    // extracting the data from the request
    const { id } = req.params;

    // if post id is not passed
    if (!id) {
      throw new CustomErrorHandling("post id required", 400);
    }

    // passing the details to model function
    const { post, status } = PostModel.get(id);

    // sending response
    res.status(status).send({
      status: "success",
      message: "post retrieved successfully",
      post,
    });
  };

  /**
   * controller function to retrieve user specific posts
   * filters the posts by caption if passed in the query
   * can change pagination settings by passing offset and limit query params
   */
  getUserPosts = (req, res) => {
    // extracting the data from the request
    const { userId } = req.params;
    const { caption, offset, limit } = req.query;

    // passing the details to model function
    const { posts, status } = PostModel.getUserPosts(
      userId,
      caption,
      offset,
      limit
    );

    // sending response
    res.status(status).send({
      status: "success",
      message: "posts retrieved successfully",
      posts,
    });
  };

  /**
   * controller function to update a post.
   * throws error if any parameter is missing.
   */
  updatePost = (req, res) => {
    // extracting the data from the request
    const { userId } = req;
    const { id } = req.params;
    const { caption } = req.body;
    const imagePath = req.file.filename;

    // if post caption is not passed
    if (!caption) {
      throw new CustomErrorHandling("caption is required", 400);
    }

    // if post image is not passed
    if (!imagePath) {
      throw new CustomErrorHandling("image URL is required", 400);
    }

    // if post id is not passed
    if (!id) {
      throw new CustomErrorHandling("post id is required", 400);
    }

    // passing the details to model function
    const { post, status } = PostModel.update(id, userId, caption, imagePath);

    // sending response
    res
      .status(status)
      .send({ status: "success", message: "post updated successfully", post });
  };

  /**
   * controller function to delete a post.
   * throws error if any parameter is missing.
   */
  deletePost = (req, res) => {
    // extracting the data from the request
    const { id } = req.params;
    const { userId } = req;

    // if post id is not passed
    if (!id) {
      throw new CustomErrorHandling("post id is required");
    }

    // passing the details to model function
    const { post, status } = PostModel.delete(id, userId);

    // sending response
    res
      .status(status)
      .send({ status: "success", message: "post deleted successfully", post });
  };

  /**
   * controller function to toggle bookmark a post.
   */
  toggleBookmark = (req, res) => {
    const { id } = req.params;
    const { posts, message, status } = PostModel.bookmark(id);

    return res.status(status).send({ status: "success", message, posts });
  };
}

// exporting the class
export default PostController;
