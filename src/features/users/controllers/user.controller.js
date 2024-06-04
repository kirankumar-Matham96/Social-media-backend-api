// package imports
import jwt from "jsonwebtoken";
import "dotenv/config";

// module imports
import UserModel from "../models/user.model.js";
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

/**
 * This controller class contains the functionalities to create, retrieve, update and delete users.
 */
class UserController {
  /**
   * controller function to create/register a new user.
   * throws error if any parameter is missing.
   */
  registerUser = (req, res) => {
    // extracting the data from the request
    const { name, email, password } = req.body;

    // if name is not passed
    if (!name) {
      throw new CustomErrorHandling("name is required", 400);
    }

    // if email is not passed
    if (!email) {
      throw new CustomErrorHandling("email is required", 400);
    }

    // if password is not passed
    if (!password) {
      throw new CustomErrorHandling("password is required", 400);
    }

    // passing the details to model function
    const { user, status } = UserModel.add(name, email, password);

    // sending response
    res.status(status).send({
      status: "success",
      message: "user registered successfully",
      user: user,
    });
  };

  /**
   * controller function to login a user
   * throws error if any parameter is missing
   */
  login = (req, res) => {
    // extracting the data from the request
    const { email, password } = req.body;

    // if email is not passed
    if (!email) {
      throw new CustomErrorHandling("email is required", 400);
    }

    // if password is not passed
    if (!password) {
      throw new CustomErrorHandling("password is required", 400);
    }

    // passing the details to model function
    const { user, status } = UserModel.confirmLogin(email, password);

    // creating a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_CODE,
      { expiresIn: "1h" }
    );

    // sending response
    res.status(status).send({
      status: "success",
      message: "user loggedin successfully",
      user: user,
      token: token,
    });
  };
}

// exporting the controller class
export default UserController;
