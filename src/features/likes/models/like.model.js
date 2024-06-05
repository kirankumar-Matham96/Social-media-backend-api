// package imports
import { v4 as uuidv4 } from "uuid";

// likes list
const likes = [
  {
    id: "1",
    userId: "1",
    postId: "1",
  },
  {
    id: "2",
    userId: "1",
    postId: "2",
  },
  {
    id: "3",
    userId: "2",
    postId: "3",
  },
  {
    id: "4",
    userId: "2",
    postId: "4",
  },
  {
    id: "5",
    userId: "1",
    postId: "5",
  },
  {
    id: "6",
    userId: "1",
    postId: "6",
  },
  {
    id: "7",
    userId: "2",
    postId: "7",
  },
  {
    id: "8",
    userId: "2",
    postId: "8",
  },
  {
    id: "9",
    userId: "1",
    postId: "9",
  },
  {
    id: "10",
    userId: "1",
    postId: "10",
  },
  {
    id: "11",
    userId: "2",
    postId: "11",
  },
  {
    id: "12",
    userId: "2",
    postId: "1",
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

    let message = "";

    if (likedIndex == -1) {
      // if index not found, creating a new like model
      const newLike = new LikeModel(userId, postId);
      likes.push(newLike);
      message = "liked";
    } else {
      // if index found, removing the like
      likes.splice(likedIndex, 1);
      message = "disliked";
    }
    return { message, status: 200 };
  };

  /**
   * model function to retrieve all the likes.
   *
   * parameters:
   *   userId: logged in user id
   *   postId: post id
   */
  static getAllLikesOfPost = (postId) => {
    // filtering the like of a specific post
    const filteredLikes = likes.filter((like) => like.postId === postId);
    return { likes: filteredLikes, status: 200 };
  };
}

export default LikeModel;
