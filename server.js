// package imports
import express from "express";
import "dotenv/config";

// module imports
import UsersRouter from "./src/features/users/routes/user.routes.js";
import PostsRouter from "./src/features/posts/routes/post.routes.js";
import CommentsRouter from "./src/features/comments/routes/comment.routes.js";
import LikesRouter from "./src/features/likes/routes/like.routes.js";
import { errorHandlingMiddleware } from "./src/middlewares/customErrorHandling.middleware.js";
import { auth } from "./src/middlewares/jwtAuth.middleware.js";
import { loggerMiddleware } from "./src/middlewares/logger.middleware.js";

// port imported from env file
const port = process.env.PORT;

// initialization of express
const app = express();

// format settings for input acceptance
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using logger middleware
app.use(loggerMiddleware);

// routes for various functionalities
app.use("/api/users", UsersRouter);
app.use("/api/posts", auth, PostsRouter);
app.use("/api/comments", auth, CommentsRouter);
app.use("/api/likes", auth, LikesRouter);

// using error handling middleware
app.use(errorHandlingMiddleware);

// basic route
app.get("/", (req, res) => {
  res.send("Welcome to Social Media API");
});

// listen for server connection
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
