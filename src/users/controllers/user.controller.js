import UserModel from "../models/user.model.js";

class UserController {
  registerUser = (req, res) => {
    const { name, email, password } = req.body;
    if (!name) {
      throw new Error("name is required", 400);
    }
    if (!email) {
      throw new Error("email is required", 400);
    }
    if (!password) {
      throw new Error("password is required", 400);
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
      throw new Error("email is required", 400);
    }
    if (!password) {
      throw new Error("password is required", 400);
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
