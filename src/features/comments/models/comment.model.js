// package imports
import { v4 as uuidv4 } from "uuid";

// module import
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

// comments list
const comments = [
  {
    id: "1",
    userId: "1",
    postId: "1",
    content: "1 Some post related content",
  },
  {
    id: "2",
    userId: "1",
    postId: "2",
    content: "2 Some post related content",
  },
  {
    id: "3",
    userId: "2",
    postId: "3",
    content: "3 Some post related content",
  },
  {
    id: "4",
    userId: "2",
    postId: "4",
    content: "4 Some post related content",
  },
  {
    id: "5",
    userId: "1",
    postId: "5",
    content: "5 Some post related content",
  },
  {
    id: "6",
    userId: "1",
    postId: "6",
    content: "6 Some post related content",
  },
  {
    id: "7",
    userId: "2",
    postId: "7",
    content: "7 Some post related content",
  },
  {
    id: "8",
    userId: "2",
    postId: "8",
    content: "8 Some post related content",
  },
  {
    id: "9",
    userId: "1",
    postId: "9",
    content: "9 Some post related content",
  },
  {
    id: "10",
    userId: "1",
    postId: "10",
    content: "10 Some post related content",
  },
  {
    id: "11",
    userId: "2",
    postId: "11",
    content: "11 Some post related content",
  },
  {
    id: "12",
    userId: "2",
    postId: "1",
    content: "12 Some post related content",
  },
];

/**
 * This is a comment model class, which handles all the comments.
 */
class CommentModel {
  // constructor
  constructor(userId, postId, content) {
    this.id = uuidv4();
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }

  /**
   * model function to create comment.
   * throws error if any parameter is missing.
   *
   * parameters:
   *   userId: user id.
   *   id: post id.
   *   content: comment content.
   */
  static add = (userId, postId, content) => {
    // creating new comment
    const newComment = new CommentModel(userId, postId, content);
    return { comment: newComment, status: 200 };
  };

  /**
   * model function to get all the comments related to a post.
   *
   * parameters:
   *   postId: post id
   *   offset: to skip the comments
   *   limit: to set limit to comments
   *   commentsToPaginate: list of comments to apply pagination on
   */
  static getAll = (postId, offset = "0", limit = "10") => {
    // filtering the comments related to specific post
    const commentsFound = comments.filter(
      (comment) => comment.postId === postId
    );

    return {
      comments: this.pagination(offset, limit, commentsFound),
      status: 200,
    };
  };

  /**
   * model function to update comment content.
   * throws error if post not found.
   * throws error if post is not created by loggedin user.
   *
   * parameters:
   *   userId: user id.
   *   id: post id.
   *   content: comment content.
   */
  static update = (userId, postId, content) => {
    // finding the comment
    const commentFound = comments.find((comment) => comment.postId === postId);

    //  if comment not found
    if (!commentFound) {
      throw new CustomErrorHandling("post not found", 404);
    }

    // if the user not created this comment
    if (commentFound.userId !== userId) {
      throw new CustomErrorHandling(
        "user not allowed to update this comment",
        403
      );
    }

    // updating the comment content
    commentFound.content = content;
    return { comment: commentFound, status: 200 };
  };

  /**
   * model function to delete the comment.
   * throws error if post not found.
   * throws error if post is not created by loggedin user.
   *
   * parameters:
   *   userId: user id.
   *   id: post id.
   */
  static delete = (userId, postId) => {
    // finding the comment index
    const commentIndexFound = comments.findIndex(
      (comment) => comment.postId === postId
    );

    // if the comment not found
    if (commentIndexFound == -1) {
      throw new CustomErrorHandling("comment not found", 404);
    }

    // if the user not created this comment
    if (comments[commentIndexFound].userId !== userId) {
      throw new CustomErrorHandling(
        "user not allowed to delete this comment",
        403
      );
    }

    // removing the comment from the list
    comments.splice(commentIndexFound, 1);

    return { comment: comments[commentIndexFound], status: 200 };
  };

  /**
   * model function to apply pagination
   *
   * parameters:
   *   offset: to skip the comments
   *   limit: to set limit to comments
   *   commentsToPaginate: list of comments to apply pagination on
   */
  static pagination = (offset, limit, commentsToPaginate = comments) => {
    // converting into integers
    offset = parseInt(offset);
    limit = parseInt(limit);

    // adjusting the values for list indices
    if (offset > 0) {
      offset--;
    }

    return commentsToPaginate.slice(offset, offset + limit);
  };
}

export default CommentModel;
