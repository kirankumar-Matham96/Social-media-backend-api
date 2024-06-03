import LikeModel from "../models/like.model.js";

class LikeController {
  likePost = (req, res) => {
    const { userId } = req;
    const { postId } = req.params;

    if (!postId) {
      throw new Error("post id is required");
    }

    const { status } = LikeModel.add(userId, postId);
    res
      .status(status)
      .send({ status: "success", message: "post liked successfully" });
  };

  disLikePost = (req, res) => {
    const { userId } = req;
    const { postId } = req.params;

    if (!postId) {
      throw new Error("post id is required");
    }

    const { status } = LikeModel.remove(userId, postId);
    res
      .status(status)
      .send({ status: "success", message: "post disliked successfully" });
  };

  getAllLikesOfAPost = (req, res) => {
    const { userId } = req;
    const { postId } = req.params;

    if (!postId) {
      throw new Error("post id is required");
    }

    const { posts, status } = LikeModel.getAllOfPost(userId, postId);
    res
      .status(status)
      .send({
        status: "success",
        message: "post disliked successfully",
        posts,
      });
  };
}

export default LikeController;
