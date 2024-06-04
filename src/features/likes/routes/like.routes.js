// package imports
import express from "express";

// module imports
import LikeController from "../controllers/like.controller.js";

// initializing the express router
const router = express.Router();

// initializing the class
const likeController = new LikeController();

// like routes
router.get("/:id", likeController.getAllLikesOfAPost);
router.get("/toggle/:id", likeController.toggleLike);

// exporting the express router
export default router;
