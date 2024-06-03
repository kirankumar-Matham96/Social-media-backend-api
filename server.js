import express from "express";

import UsersRouter from "./src/features/users/routes/user.routes.js";
import PostsRouter from "./src/features/posts/routes/post.routes.js";
import CommentsRouter from "./src/features/comments/routes/comment.routes.js";
import LikesRouter from "./src/features/likes/routes/like.routes.js";
import { errorHandlingMiddleware } from "./src/middlewares/customErrorHandling.middleware.js";
import { auth } from "./src/middlewares/jwtAuth.middleware.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", UsersRouter);
app.use("/api/posts", auth, PostsRouter);
app.use("/api/comments", CommentsRouter);
app.use("/api/likes", LikesRouter);

app.use(errorHandlingMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to Social Media API");
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
