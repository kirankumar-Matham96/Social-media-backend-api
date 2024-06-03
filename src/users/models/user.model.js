import { v4 as uuidv4 } from "uuid";

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

  static add(name, email, password) {
    const newUser = new UserModel(name, email, password);
    users.push(newUser);
    return newUser;
  }

  static getAll() {
    return users;
  }

  static get(id) {
    const userFound = users.find((user) => user.id === id);
    if (!userFound) {
      throw new Error("user not found", 404);
    }
    return userFound;
  }

  static confirmLogin(id, email, password) {
    const userFound = users.find((user) => user.id === id);
    if (!userFound) {
      throw new Error("user not found", 404);
    }
    if (userFound.email === email && userFound.password === password) {
      return userFound;
    }
  }
}
