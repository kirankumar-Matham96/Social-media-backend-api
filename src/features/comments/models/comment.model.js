// package imports
import { v4 as uuidv4 } from "uuid";

// module import
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

// comments list
const comments = [
  {
    id: "post_1",
    userId: "1",
    postId: "1",
    content: "1 Some post related content",
  },
  {
    id: "post_2",
    userId: "1",
    postId: "2",
    content: "2 Some post related content",
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
   *   id: post id.
   */
  static getAll = (postId) => {
    // filtering the comments related to specific post
    const commentsFound = comments.filter(
      (comment) => comment.postId === postId
    );
    return { comments: commentsFound, status: 200 };
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
}

export default CommentModel;
