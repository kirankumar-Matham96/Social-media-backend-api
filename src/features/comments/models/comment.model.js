import { v4 as uuidv4 } from "uuid";
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

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

class CommentModel {
  constructor(userId, postId, content) {
    this.id = uuidv4();
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }

  static add = (userId, postId, content) => {
    const newComment = new CommentModel(userId, postId, content);
    return { comment: newComment, status: 200 };
  };

  static getAll = (postId) => {
    const commentsFound = comments.filter(
      (comment) => comment.postId === postId
    );
    return { comments: commentsFound, status: 200 };
  };

  static update = (userId, postId, content) => {
    const commentFound = comments.find((comment) => comment.postId === postId);
    if (!commentFound) {
      throw new CustomErrorHandling("post not found", 404);
    }

    if (commentFound.userId !== userId) {
      throw new CustomErrorHandling(
        "user not allowed to update this comment",
        403
      );
    }

    commentFound.content = content;
    return { comment: commentFound, status: 200 };
  };

  static delete = (userId, postId) => {
    const commentIndexFound = comments.findIndex(
      (comment) => comment.postId === postId
    );

    if (commentIndexFound == -1) {
      throw new CustomErrorHandling("post not found", 404);
    }

    if (comments[commentIndexFound].userId !== userId) {
      throw new CustomErrorHandling(
        "user not allowed to delete this comment",
        403
      );
    }

    comments.splice(commentIndexFound, 1);

    return { posts: postsFound, status: 200 };
  };
}

export default CommentModel;
