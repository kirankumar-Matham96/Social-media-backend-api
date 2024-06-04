import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "Request - Logging" },
  transports: [new winston.transports.File({ filename: "combined.log" })],
});

export const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("register") && !req.url.includes("login")) {
    const logData = `${new Date().toString()} - Req URL: ${
      req.url
    } - Req Body: ${JSON.stringify(req.body)}\n`;
    logger.info(logData);
  }
  next();
};
