import PostModel from "../models/post.model.js";
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

class PostController {
  createPost = (req, res) => {
    const { caption, image } = req.body;
    const { userId } = req.userId;
    if (!caption) {
      throw new CustomErrorHandling("caption is required", 400);
    }
    if (!image) {
      throw new CustomErrorHandling("image url is required", 400);
    }

    const { post, status } = PostModel.add(userId, caption, image);
    res
      .status(status)
      .send({ status: "success", message: "post created successfully", post });
  };

  getAllPosts = (req, res) => {
    const { posts, status } = PostModel.getAll();
    res.status(status).send({
      status: "success",
      message: "posts retrieved successfully",
      posts,
    });
  };

  getPostById = (req, res) => {
    const { postId } = req.params;
    if (!postId) {
      throw new CustomErrorHandling("post id required", 400);
    }

    const { post, status } = PostModel.get(postId);
    res.status(status).send({
      status: "success",
      message: "post retrieved successfully",
      post,
    });
  };

  getUserPosts = (req, res) => {
    const { userId } = req.params;
    const { posts, status } = PostModel.getUserPosts(userId);
    res.status(status).send({
      status: "success",
      message: "posts retrieved successfully",
      posts,
    });
  };

  updatePost = (req, res) => {
    const { postId } = req.params;
    const { userId } = req;
    const { caption, imageUrl } = req.body;

    if (!caption) {
      throw new CustomErrorHandling("caption is required", 400);
    }
    if (!imageUrl) {
      throw new CustomErrorHandling("image URL is required", 400);
    }
    if (!postId) {
      throw new CustomErrorHandling("post id is required", 400);
    }

    const { post, status } = PostModel.update(
      postId,
      userId,
      caption,
      imageUrl
    );
    res
      .status(status)
      .send({ status: "success", message: "post updated successfully", post });
  };

  deletePost = (req, res) => {
    const { postId } = req.params;
    const { userId } = req;
    if (!postId) {
      throw new CustomErrorHandling("post id is required");
    }
    const { post, status } = PostModel.delete(postId, userId);
    res
      .status(status)
      .send({ status: "success", message: "post deleted successfully", post });
  };
}

export default PostController;
