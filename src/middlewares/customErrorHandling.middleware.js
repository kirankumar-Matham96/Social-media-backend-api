export class CustomErrorHandling extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}

export const errorHandlingMiddleware = (err, req, res, next) => {
  if (err instanceof CustomErrorHandling) {
    return res.status(err.code).send({ status: "failure", error: err.message });
  }

  console.log(err);

  return res.status(500).send({
    status: "failure",
    error: "Oops! Something went wrong... Please try later again",
  });
};
