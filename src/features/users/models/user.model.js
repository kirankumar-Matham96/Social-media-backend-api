// package imports
import { v4 as uuidv4 } from "uuid";

// module imports
import { CustomErrorHandling } from "../../../middlewares/customErrorHandling.middleware.js";

// users list
const users = [
  { id: "1", name: "User 1", email: "user1@gmail.com", password: "user1" },
  { id: "2", name: "User 2", email: "user2@gmail.com", password: "user2" },
];

/**
 * This is a user model class, which handles all the users.
 */
class UserModel {
  // constructor
  constructor(name, email, password) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
  }

  /**
   * model function to create a new user
   *
   * parameters:
   *   name: user name
   *   email: user email
   *   password: user password
   */
  static add = (name, email, password) => {
    // creating/registering a new user
    const newUser = new UserModel(name, email, password);
    users.push(newUser);
    return { user: newUser, status: 200 };
  };

  /**
   * model function to create a new user
   */
  static getAll = () => {
    return { users, status: 200 };
  };

  /**
   * model function to retrieve a user by id
   * throws error if user not found
   *
   * parameters:
   *   id: user id
   */
  static get = (id) => {
    // finding the user by id
    const userFound = users.find((user) => user.id === id);

    // if user not found
    if (!userFound) {
      throw new CustomErrorHandling("user not found", 404);
    }
    return { user: userFound, status: 200 };
  };

  /**
   * model function to confirm the user login
   * throws error if user not found or password not match
   *
   * parameters:
   *   email: user email
   *   password: user password
   */
  static confirmLogin = (email, password) => {
    // finding the user by email
    const userFound = users.find((user) => user.email === email);

    // if the user not found
    if (!userFound) {
      throw new CustomErrorHandling("user not found", 404);
    }

    // if the user password not matched
    if (userFound.password !== password) {
      throw new CustomErrorHandling("invalid credentials", 400);
    }
    return { user: userFound, status: 200 };
  };
}

// exporting the user model class
export default UserModel;
