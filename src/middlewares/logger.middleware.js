/**
 * This module will handle the logs
 */

// package import
import winston from "winston";

// logger config
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "Request - Logging" },
  transports: [new winston.transports.File({ filename: "combined.log" })],
});

/**
 * This function will log all the requests from the user, except register and login requests
 */
export const loggerMiddleware = async (req, res, next) => {
  // condition to check if the request is not user register and login related
  if (!req.url.includes("signin") && !req.url.includes("signup")) {
    const logData = `${new Date().toString()} - Req URL: ${
      req.url
    } - Req Body: ${JSON.stringify(req.body)}\n`;
    logger.info(logData);
  }
  next();
};
