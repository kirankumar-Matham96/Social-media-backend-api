// package import
import { body, validationResult } from "express-validator";

/**
 * This middleware handles all the validations
 */
export class ValidationMiddleware {
  /**
   * validates user signup data
   */
  static userSignUpValidation = async (req, res, next) => { 
    try {
      await body("name").notEmpty().withMessage("name is required").run(req);
      await body("email")
        .notEmpty()
        .isEmail()
        .withMessage("valid email is required")
        .run(req);
      await body("password")
        .notEmpty()
        .withMessage("password is required")
        .run(req);

      const validationResults = validationResult(req);

      if (validationResults.array().length > 0) {
        throw new Error(validationResults.array()[0].msg, 400);
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * validates user signin data
   */
  static userSignInValidation = async (req, res, next) => {
    try {
      await body("email")
        .notEmpty()
        .isEmail()
        .withMessage("valid email is required")
        .run(req);
      await body("password")
        .notEmpty()
        .withMessage("password is required")
        .run(req);

      const validationResults = validationResult(req);

      if (validationResults.array().length > 0) {
        throw new Error(validationResults.array()[0].msg, 400);
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * validates post data
   */
  static postsValidation = async (req, res, next) => {
    try {
      await body("caption")
        .notEmpty()
        .withMessage("caption is required")
        .run(req);

      const validationResults = validationResult(req);
      
      if (validationResults.array().length > 0) {
        throw new Error(validationResults.array()[0].msg, 400);
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * validates comment data
   */
  static commentsValidation = async (req, res, next) => {
    try {
      await body("content")
        .notEmpty()
        .withMessage("content is required")
        .run(req);

      const validationResults = validationResult(req);

      if (validationResults.array().length > 0) {
        throw new Error(validationResults.array()[0].msg, 400);
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };
}
