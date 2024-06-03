import express from "express";
import PostController from "../controllers/post.controller.js";

const postController = new PostController();

const router = express.Router();

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:postId", postController.getPostById);
router.get("/:userId", postController.getUserPosts);
router.put("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);

export default router;
