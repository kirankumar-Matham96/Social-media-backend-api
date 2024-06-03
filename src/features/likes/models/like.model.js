import { v4 as uuidv4 } from "uuid";
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

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

class LikeModel {
  constructor(userId, postId) {
    this.id = uuidv4();
    this.userId = userId;
    this.postId = postId;
  }

  static add(userId, postId) {
    const likedAlready = likes.find(
      (like) => like.userId === userId && like.postId === postId
    );
    if (!likedAlready) {
      const newLike = new LikeModel(userId, postId);
      likes.push(newLike);
    }

    return { status: 200 };
  }

  static remove(userId, postId) {
    const likeIndexFound = likes.findIndex(
      (like) => like.userId === userId && like.postId === postId
    );
    if (likeIndexFound == -1) {
      throw new CustomErrorHandling("like not found", 404);
    }

    likes.splice(likeIndexFound, 1);

    return { status: 200 };
  }

  static getAllOfPost = (userId, postId) => {
    const posts = likes.filter(like=> like.userId === userId && like.postId === postId);  
    return {posts, status: 200};  
  }
}

export default LikeModel;
