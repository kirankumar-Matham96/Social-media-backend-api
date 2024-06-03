import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

const userController = new UserController();

router.get("/register", userController.registerUser)
router.get("/login", userController.login)

export default router;