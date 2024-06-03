import express from "express";
import LikeController from "../controllers/like.controller.js";

const router = express.Router();

const likeController = new LikeController();

router.post("/:postId", likeController.likePost);
router.get("/:postId", likeController.getAllLikesOfAPost);
router.delete("/:postId", likeController.disLikePost);

export default router;
