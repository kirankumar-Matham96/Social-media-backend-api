/**
 * This module will handle the authorization using JWT
 */

// package imports
import jwt from "jsonwebtoken";
import "dotenv/config";

// module imports
import { CustomErrorHandling } from "./customErrorHandling.middleware.js";

/**
 * This function will authorize the user by verifying the JWT token
 */
export const auth = (req, res, next) => {
  // getting the token from the request headers
  const token = req.headers["token"];

  // if the token not found
  if (!token) {
    throw new CustomErrorHandling("unauthorized", 401);
  }

  // verifying the token
  try {
    const payload = jwt.verify(token, process.env.SECRET_CODE);
    // adding the user id to the request from payload
    req.userId = payload.id;
    next();
  } catch (error) {
    console.log("error in auth: ", { error });
    throw new CustomErrorHandling("unauthorized", 401);
  }
};
