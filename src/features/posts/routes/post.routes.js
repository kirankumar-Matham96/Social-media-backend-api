// package imports
import express from "express";

// module imports
import PostController from "../controllers/post.controller.js";
import { upload } from "../../../middlewares/fileUpload.middleware.js";

// initializing the class
const postController = new PostController();

// initializing the express router
const router = express.Router();

// post related routes
router.post("/", upload.single("image"), postController.createPost);
router.get("/all", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.get("/", postController.getUserPosts);
router.put("/:id", upload.single("image"), postController.updatePost);
router.delete("/:id", postController.deletePost);

// exporting the express route
export default router;
