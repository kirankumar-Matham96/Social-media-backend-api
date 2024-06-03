import UserModel from "../models/user.model.js";
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

class UserController {
  registerUser = (req, res) => {
    console.log("In Controller");
    console.log(req.body);
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
    res.status(status).send({
      status: "success",
      message: "user retrieved successfully",
      user: user,
    });
  };
}

export default UserController;
