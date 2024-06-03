import jwt from "jsonwebtoken";
import "dotenv/config";
import { CustomErrorHandling } from "./customErrorHandling.middleware.js";

export const auth = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    throw new CustomErrorHandling("unauthorized", 401);
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_CODE);
    req.userId = payload.id;
    next();
  } catch (error) {
    console.log("error in auth: ", { error });
    throw new CustomErrorHandling("unauthorized", 401);
  }
};
