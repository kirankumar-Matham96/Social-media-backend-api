// package imports
import express from "express";

// module imports
import PostController from "../controllers/post.controller.js";
import { upload } from "../../../middlewares/fileUpload.middleware.js";
import { ValidationMiddleware } from "../../../middlewares/validation.middleware.js";
import { PostHelper } from "../../../helpers/post.helper.js";

// initializing the class
const postController = new PostController();

// initializing the express router
const router = express.Router();

// post related routes
router.post(
  "/",
  upload.single("image"),
  ValidationMiddleware.postsValidation,
  postController.createPost
);
router.post(
  "/draft",
  upload.single("image"),
  ValidationMiddleware.postsValidation,
  PostHelper.saveDraft
);
router.get(
  "/all",
  ValidationMiddleware.queryParamsValidations,
  postController.getAllPosts
);
router.get("/:id", postController.getPostById);
router.get(
  "/",
  ValidationMiddleware.queryParamsValidations,
  postController.getUserPosts
);
router.put(
  "/:id",
  upload.single("image"),
  ValidationMiddleware.postsValidation,
  postController.updatePost
);
router.delete("/:id", postController.deletePost);
router.put("/bookmark/:id", postController.toggleBookmark);
router.post("/archive/:id", PostHelper.archivePost);
// exporting the express route
export default router;
