import express from "express";
import PostController from "../controllers/post.controller.js";
import { upload } from "../../../middlewares/fileUpload.middleware.js";

const postController = new PostController();

const router = express.Router();

router.post("/", upload.single("image"), postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:postId", postController.getPostById);
router.get("/:userId", postController.getUserPosts);
router.put("/:postId", upload.single("image"), postController.updatePost);
router.delete("/:postId", postController.deletePost);

export default router;
