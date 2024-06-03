import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";
import "dotenv/config";

class UserController {
  registerUser = (req, res) => {
    const { name, email, password } = req.body;
    if (!name) {
      throw new CustomErrorHandling("name is required", 400);
    }
    if (!email) {
      throw new CustomErrorHandling("email is required", 400);
    }
    if (!password) {
      throw new CustomErrorHandling("password is required", 400);
    }

    const { user, status } = UserModel.add(name, email, password);

    res.status(status).send({
      status: "success",
      message: "user registered successfully",
      user: user,
    });
  };

  login = (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      throw new CustomErrorHandling("email is required", 400);
    }
    if (!password) {
      throw new CustomErrorHandling("password is required", 400);
    }

    const { user, status } = UserModel.confirmLogin(email, password);
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_CODE,
      { expiresIn: "1h" }
    );

    res.status(status).send({
      status: "success",
      message: "user loggedin successfully",
      user: user,
      token: token,
    });
  };
}

export default UserController;
