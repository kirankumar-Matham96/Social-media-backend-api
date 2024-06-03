import express from "express";

import UserRouter from "./src/users/routes/user.routes.js";
import PostRouter from "./src/posts/routes/post.routes.js";
import CommentsRouter from "./src/comments/routes/comment.routes.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", UserRouter);
app.use("/api/posts", PostRouter);
app.use("/api/comments", CommentsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Social Media API");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
