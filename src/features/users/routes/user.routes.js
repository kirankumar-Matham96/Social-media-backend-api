// package imports
import express from "express";

// module imports
import UserController from "../controllers/user.controller.js";
import { ValidationMiddleware } from "../../../middlewares/validation.middleware.js";

// initializing express router
const router = express.Router();

// initializing user controller class
const userController = new UserController();

router.post(
  "/signup",
  ValidationMiddleware.userSignUpValidation,
  userController.registerUser
);
router.post(
  "/signin",
  ValidationMiddleware.userSignInValidation,
  userController.login
);

// exporting express router
export default router;
