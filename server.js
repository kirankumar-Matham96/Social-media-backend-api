import express from "express";

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Social Media API");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
