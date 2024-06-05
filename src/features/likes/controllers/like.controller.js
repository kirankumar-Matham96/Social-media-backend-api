// module imports
import LikeModel from "../models/like.model.js";
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

/**
 * This class contains the functionalities to retrieve all posts and toggle like of a post.
 */
class LikeController {
  /**
   * controller function to toggle like of a post.
   * throws error if any parameter is missing.
   *
   * parameters:
   *   userId: logged in user id extracted from request.
   *   id: post id extracted from request params.
   */
  toggleLike = (req, res) => {
    // extracting the data from the request
    const { userId } = req;
    const { id } = req.params;

    // if post id is not passed
    if (!id) {
      throw new CustomErrorHandling("post id is required");
    }

    // passing the details to model function
    const { message, status } = LikeModel.toggle(userId, id);

    // sending response
    res
      .status(status)
      .send({ status: "success", message: `post ${message} successfully` });
  };

  /**
   * controller function to retrieve all likes of a post.
   * throws error if any parameter is missing.
   *
   * parameters:
   *   userId: logged in user id extracted from request.
   *   id: post id extracted from request params.
   */
  getAllLikesOfAPost = (req, res) => {
    // extracting the data from the request
    const { id } = req.params;

    // if post id is not passed
    if (!id) {
      throw new CustomErrorHandling("post id is required");
    }

    // passing the details to model function
    const { likes, status } = LikeModel.getAllLikesOfPost(id);

    // sending response
    res.status(status).send({
      status: "success",
      message: "likes retrieved",
      likes: likes,
    });
  };
}

// exporting the class
export default LikeController;
