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
    date: "Wed Jun 05 2024 14:23:45 GMT+0200 (Central European Summer Time)",
    isBookmarked: false,
  },
  {
    id: "2",
    userId: "2",
    caption: "Second caption",
    imageUrl: "http://sampleurl2.com",
    date: "Tue Jan 16 2024 09:15:30 GMT-0500 (Eastern Standard Time)",
    isBookmarked: false,
  },
  {
    id: "3",
    userId: "1",
    caption: "First caption",
    imageUrl: "http://sampleurl1.com",
    date: "Sun Mar 03 2024 22:45:00 GMT+0530 (India Standard Time)",
    isBookmarked: false,
  },
  {
    id: "4",
    userId: "2",
    caption: "Second caption",
    imageUrl: "http://sampleurl2.com",
    date: "Fri Oct 11 2024 18:30:25 GMT+0100 (British Summer Time)",
    isBookmarked: false,
  },
  {
    id: "5",
    userId: "1",
    caption: "First caption",
    imageUrl: "http://sampleurl1.com",
    date: "Mon Nov 25 2024 12:10:55 GMT-0800 (Pacific Standard Time)",
    isBookmarked: false,
  },
  {
    id: "6",
    userId: "2",
    caption: "Second caption",
    imageUrl: "http://sampleurl2.com",
    date: "Thu Sep 19 2024 07:20:05 GMT+0000 (Coordinated Universal Time)",
    isBookmarked: false,
  },
  {
    id: "7",
    userId: "1",
    caption: "First caption",
    imageUrl: "http://sampleurl1.com",
    date: "Sat Dec 07 2024 16:40:15 GMT+0900 (Japan Standard Time)",
    isBookmarked: false,
  },
  {
    id: "8",
    userId: "2",
    caption: "Second caption",
    imageUrl: "http://sampleurl2.com",
    date: "Tue Jul 30 2024 11:55:35 GMT+0300 (Moscow Standard Time)",
    isBookmarked: false,
  },
  {
    id: "9",
    userId: "2",
    caption: "Second caption",
    imageUrl: "http://sampleurl2.com",
    date: "Wed Apr 17 2024 08:05:10 GMT-0400 (Eastern Daylight Time)",
    isBookmarked: false,
  },
  {
    id: "10",
    userId: "2",
    caption: "Second caption",
    imageUrl: "http://sampleurl2.com",
    date: "Wed Apr 17 2024 08:05:10 GMT-0400 (Eastern Daylight Time)",
    isBookmarked: false,
  },
  {
    id: "11",
    userId: "2",
    caption: "Second caption",
    imageUrl: "http://sampleurl2.com",
    date: "Wed Apr 17 2024 08:05:10 GMT-0400 (Eastern Daylight Time)",
    isBookmarked: false,
  },
];

/**
 * This is a post model class, which handles all the posts
 */
class PostModel {
  // constructor
  constructor(userId, caption, imageUrl) {
    this.id = uuidv4();
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
    this.date = new Date().toString();
    this.isBookmarked = false;
  }

  /**
   * model function to create a new post
   *
   * parameters:
   *   userId: logged in user id
   *   caption: post caption
   *   imageUrl: post image
   */
  static add = (userId, caption, imageUrl) => {
    // creating a new post
    const newPost = new PostModel(userId, caption, imageUrl);
    posts.push(newPost);
    return { post: newPost, status: 200 };
  };

  /**
   * model function to retrieve all posts
   * posts will be sorted by date and returned
   * if the user pass caption query in the request, then the posts will be filtered by caption
   * paginated by sending 10 results by default initially
   * pagination can be used by sending "offset" and "limit" query params
   *
   * parameters:
   *   caption: caption to filter posts
   *   offset: to skip the posts
   *   limit: to set limit to posts
   */
  static getAll = (caption = "", offset = "0", limit = "10") => {
    if (caption) {
      // filtering the post with caption if passed
      const filteredPosts = posts.filter((post) =>
        post.caption.includes(caption)
      );

      // sorting posts by date
      const sortedAndFilteredPosts = filteredPosts.sort((post1, post2) => {
        return new Date(post2.date) - new Date(post1.date);
      });

      return {
        // returning after pagination
        posts: this.pagination(offset, limit, sortedAndFilteredPosts),
        status: 200,
      };
    }

    // sorting posts by date
    const sortedPosts = posts.sort((post1, post2) => {
      return new Date(post2.date) - new Date(post1.date);
    });

    // returning after pagination
    return { posts: this.pagination(offset, limit, sortedPosts), status: 200 };
  };

  /**
   * model function to retrieve a post by id
   * throws error if post not found
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
   * model function to retrieve all the posts related to the loggedin user
   * posts will be sorted by date and returned
   * if the user pass caption query in the request, then the posts will be filtered by caption
   * paginated by sending 10 results by default initially
   * pagination can be used by sending "offset" and "limit" query params
   *
   * parameters:
   *   userId: logged in user id
   *   caption: caption to filter posts
   *   offset: to skip the posts
   *   limit: to set limit to posts
   */
  static getUserPosts = (userId, caption = "", offset = "0", limit = "10") => {
    // filtering the user posts
    const userPosts = posts.filter((post) => {
      return post.userId === userId;
    });

    // filtering the post with caption if passed in the query
    if (caption) {
      // filtering the post with caption if passed
      const filteredPosts = userPosts.filter((post) =>
        post.caption.includes(caption)
      );

      // sorting posts by date
      const sortedAndFilteredPosts = filteredPosts.sort((post1, post2) => {
        return new Date(post2.date) - new Date(post1.date);
      });

      return {
        // returning after adding pagination
        posts: this.pagination(offset, limit, sortedAndFilteredPosts),
        status: 200,
      };
    }

    // sorting posts by date
    const sortedPosts = userPosts.sort((post1, post2) => {
      return new Date(post2.date) - new Date(post1.date);
    });

    // returning after adding pagination
    return { posts: this.pagination(offset, limit, sortedPosts), status: 200 };
  };

  /**
   * model function to update a post by id
   * throws error if post not found
   *
   * parameters:
   *   userId: logged in user id
   *   postId: post id
   *   imageUrl: post image
   *   caption: post caption
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
    foundPost.date = new Date().toString();

    return { post: foundPost, status: 200 };
  };

  /**
   * model function to delete a post by id
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

  /**
   * model function to toggle bookmark a post
   * throws error if post not found by id
   *
   * parameters:
   *   postId: post id
   */
  static bookmark = (postId) => {
    // finding post
    const postFound = posts.find((post) => post.postId);

    // if post not found
    if (!postFound) {
      throw new Error("post not found", 404);
    }

    let message = "";

    // toggling bookmark
    if (postFound.isBookmarked) {
      postFound.isBookmarked = false;
      message = "bookmark removed";
    } else {
      postFound.isBookmarked = true;
      message = "bookmark added";
    }

    return { post: postFound, message, status: 200 };
  };

  /**
   * model function to apply pagination
   *
   * parameters:
   *   offset: to skip the posts
   *   limit: to set limit to posts
   *   postsToPaginate: list of post to apply pagination on
   */
  static pagination = (offset, limit, postsToPaginate = posts) => {
    return postsToPaginate.slice(offset, offset + limit);
  };
}

// exporting the class
export default PostModel;
