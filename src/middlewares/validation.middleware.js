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
        return res
          .status(400)
          .send({ status: "failure", error: validationResults.array()[0].msg });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "failure",
        error: "Oops! Something went wrong... Please try later again",
      });
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
        return res
          .status(400)
          .send({ status: "failure", error: validationResults.array()[0].msg });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "failure",
        error: "Oops! Something went wrong... Please try later again",
      });
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
        return res
          .status(400)
          .send({ status: "failure", error: validationResults.array()[0].msg });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "failure",
        error: "Oops! Something went wrong... Please try later again",
      });
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
        return res
          .status(400)
          .send({ status: "failure", error: validationResults.array()[0].msg });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "failure",
        error: "Oops! Something went wrong... Please try later again",
      });
    }
  };
}
