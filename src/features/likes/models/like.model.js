// package imports
import { v4 as uuidv4 } from "uuid";

// likes list
const likes = [
  {
    id: "like_1",
    userId: "user_1",
    postId: "post_1",
  },
  {
    id: "like_2",
    userId: "user_2",
    postId: "post_2",
  },
];

/**
 * This is a likes model class, which handles all the likes.
 */
class LikeModel {
  // constructor
  constructor(userId, postId) {
    this.id = uuidv4();
    this.userId = userId;
    this.postId = postId;
  }

  /**
   * model function to toggle like of a post.
   *
   * parameters:
   *   userId: logged in user id
   *   postId: post id
   */
  static toggle = (userId, postId) => {
    //  finding index of like
    const likedIndex = likes.findIndex(
      (like) => like.userId === userId && like.postId === postId
    );

    if (likedIndex == -1) {
      // if index not found, creating a new like model
      const newLike = new LikeModel(userId, postId);
      likes.push(newLike);
    } else {
      // if index found, removing the like
      likes.splice(likedIndex, 1);
    }
    return { status: 200 };
  };

  /**
   * model function to retrieve all the likes.
   *
   * parameters:
   *   userId: logged in user id
   *   postId: post id
   */
  static getAllOfPost = (userId, postId) => {
    // filtering the like of a specific post
    const posts = likes.filter(
      (like) => like.userId === userId && like.postId === postId
    );
    return { posts, status: 200 };
  };
}

export default LikeModel;
