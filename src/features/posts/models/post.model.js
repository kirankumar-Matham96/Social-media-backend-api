import { v4 as uuidv4 } from "uuid";
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

const posts = [
  {
    id: "1",
    userId: "1",
    caption: "First caption",
    imageUrl: "http://sampleurl1.com",
  },
  {
    id: "2",
    userId: "2",
    caption: "Second caption",
    imageUrl: "http://sampleurl2.com",
  },
];

class PostModel {
  constructor(userId, caption, imageUrl) {
    this.id = uuidv4();
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
  }

  static add = (userId, caption, imageUrl) => {
    const newPost = new PostModel(userId, caption, imageUrl);
    return { post: newPost, status: 200 };
  };

  static getAll = () => {
    return { posts, status: 200 };
  };

  static get = (id) => {
    const postFound = posts.find((post) => post.id === id);
    if (!postFound) {
      throw new CustomErrorHandling("post not found", 404);
    }

    return { post: postFound, status: 200 };
  };

  static getUserPosts = (userId) => {
    const userPosts = posts.filter((post) => post.userId === userId);
    return { posts: userPosts, status: 200 };
  };

  static update = (postId, userId, caption, imageUrl) => {
    const foundPost = posts.find((post) => post.id === postId);
    if (!foundPost) {
      throw new CustomErrorHandling("post not found", 404);
    }

    if (postFound.userId !== userId) {
      throw new CustomErrorHandling("user not authorized", 403);
    }

    foundPost.caption = caption;
    foundPost.imageUrl = imageUrl;

    return { post: foundPost, status: 200 };
  };

  static delete = (postId, userId) => {
    const foundPostIndex = posts.findIndex((post) => post.id === postId);
    if (foundPostIndex == -1) {
      throw new CustomErrorHandling("post not found", 404);
    }

    if (posts[foundPostIndex].userId !== userId) {
      throw new CustomErrorHandling("user not authorized", 403);
    }

    const postDeleted = posts.splice(foundPostIndex, 1);

    return { post: postDeleted, status: 200 };
  };
}

export default PostModel;
