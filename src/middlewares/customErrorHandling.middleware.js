/**
 * This module will handle the errors from the application
 */

// custom error handling class
export class CustomErrorHandling extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}

/**
 * This function will handle all the errors in the app.
 */
export const errorHandlingMiddleware = (err, req, res, next) => {
  // if the error is instance of the custom class (handled error)
  if (err instanceof CustomErrorHandling) {
    return res.status(err.code).send({ status: "failure", error: err.message });
  }

  // if the error is unhandled
  console.log(err);
  return res.status(500).send({
    status: "failure",
    error: "Oops! Something went wrong... Please try later again",
  });
};
