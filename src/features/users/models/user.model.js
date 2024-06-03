import { v4 as uuidv4 } from "uuid";
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

const users = [
  { id: "1", name: "kiran", email: "kiran1@gmail.com", password: "12qsw3e" },
  { id: "2", name: "kiran", email: "kiran2@gmail.com", password: "12qsw3e" },
];

class UserModel {
  constructor(name, email, password) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static add = (name, email, password) => {
    const newUser = new UserModel(name, email, password);
    users.push(newUser);
    return { user: newUser, status: 200 };
  };

  static getAll = () => {
    return { users, status: 200 };
  };

  static get = (id) => {
    const userFound = users.find((user) => user.id === id);
    if (!userFound) {
      throw new CustomErrorHandling("user not found", 404);
    }
    return { user: userFound, status: 200 };
  };

  static confirmLogin = (email, password) => {
    const userFound = users.find((user) => user.email === email);
    if (!userFound) {
      throw new CustomErrorHandling("user not found", 404);
    }
    if (userFound.password !== password) {
      throw new CustomErrorHandling("invalid credentials", 400);
    }
    return { user: userFound, status: 200 };
  };
}

export default UserModel;
