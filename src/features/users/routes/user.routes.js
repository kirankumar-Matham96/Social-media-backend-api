import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

const userController = new UserController();

router.post("/signup", userController.registerUser);
router.post("/signin", userController.login);

export default router;
