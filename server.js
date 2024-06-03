import express from "express";

import UsersRouter from "./src/users/routes/user.routes.js";
import PostsRouter from "./src/posts/routes/post.routes.js";
import CommentsRouter from "./src/comments/routes/comment.routes.js";
import LikesRouter from "./src/likes/routes/like.routes.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", UsersRouter);
app.use("/api/posts", PostsRouter);
app.use("/api/comments", CommentsRouter);
app.use("/api/likes", LikesRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Social Media API");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
