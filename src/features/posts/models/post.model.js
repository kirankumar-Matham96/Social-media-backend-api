// package imports
import { v4 as uuidv4 } from "uuid";
// module imports
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

// posts list
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

/**
 * This is a post model class, which handles all the posts.
 */
class PostModel {
  // constructor
  constructor(userId, caption, imageUrl) {
    this.id = uuidv4();
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
  }

  /**
   * model function to create a new post.
   *
   * parameters:
   *   userId: logged in user id
   *   caption: post caption
   *   imageUrl: post image
   */
  static add = (userId, caption, imageUrl) => {
    // creating a new post
    const newPost = new PostModel(userId, caption, imageUrl);
    return { post: newPost, status: 200 };
  };

  /**
   * model function to retrieve all posts
   * filters the posts with caption if passed the query
   */
  static getAll = (caption = "") => {
    // filtering the post with caption if passed
    if (caption) {
      return {
        posts: posts.filter((post) => post.caption.includes(caption)),
        status: 200,
      };
    }

    return { posts, status: 200 };
  };

  /**
   * model function to retrieve a post by id.
   * throws error if post not found.
   *
   * parameters:
   *   id: post id
   */
  static get = (id) => {
    // finding the post
    const postFound = posts.find((post) => post.id === id);
    // if post not found
    if (!postFound) {
      throw new CustomErrorHandling("post not found", 404);
    }

    return { post: postFound, status: 200 };
  };

  /**
   * model function to retrieve all the posts related to the loggedin user.
   *
   * parameters:
   *   userId: logged in user id
   */
  static getUserPosts = (userId, caption = "") => {
    // filtering the user posts
    const userPosts = posts.filter((post) => {
      return post.userId === userId;
    });

    // filtering the post with caption if passed in the query
    if (caption) {
      return {
        posts: userPosts.filter((post) => post.caption.includes(caption)),
        status: 200,
      };
    }

    return { posts: userPosts, status: 200 };
  };

  /**
   * model function to update a post by id.
   * throws error if post not found.
   *
   * parameters:
   *   userId: logged in user id
   *   postId: post id
   *   caption: post caption
   *   imageUrl: post image
   */
  static update = (postId, userId, caption, imageUrl) => {
    // finding the post
    const foundPost = posts.find((post) => post.id === postId);

    // if post not found
    if (!foundPost) {
      throw new CustomErrorHandling("post not found", 404);
    }

    // if post is not created by the loggedin user
    if (foundPost.userId !== userId) {
      throw new CustomErrorHandling("user not authorized", 403);
    }

    // updating the post details
    foundPost.caption = caption;
    foundPost.imageUrl = imageUrl;

    return { post: foundPost, status: 200 };
  };

  /**
   * model function to delete a post by id.
   * throws error if post not found.
   *
   * parameters:
   *   userId: logged in user id
   *   postId: post id
   */
  static delete = (postId, userId) => {
    // finding index of the post by id
    const foundPostIndex = posts.findIndex((post) => post.id === postId);

    // if the post not found
    if (foundPostIndex == -1) {
      throw new CustomErrorHandling("post not found", 404);
    }

    // if the post is not created by the loggedin user
    if (posts[foundPostIndex].userId !== userId) {
      throw new CustomErrorHandling("user not authorized", 403);
    }

    // removing the post from the list
    const postDeleted = posts.splice(foundPostIndex, 1);

    return { post: postDeleted, status: 200 };
  };
}

// exporting the class
export default PostModel;
