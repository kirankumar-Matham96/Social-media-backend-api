import express from "express";

import UserRouter from "./src/users/routes/user.routes.js";
import PostRouter from "./src/posts/routes/post.routes.js";

const PORT = 3000;
const app = express();

app.use("/api/user", UserRouter);
app.use("/api/post", PostRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Social Media API");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
