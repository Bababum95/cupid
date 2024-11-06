import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import fs from "fs";

const logsDirectory = path.join(process.cwd(), "logs");
const isVercel = process.env.IS_VERCEL === "true";

if (!isVercel && !fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const loggerTransports = [];

if (!isVercel) {
  loggerTransports.push(
    new DailyRotateFile({
      filename: path.join(logsDirectory, "error-%DATE%.log"),
      level: "warn",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    })
  );
  loggerTransports.push(
    new DailyRotateFile({
      filename: path.join(logsDirectory, "combined-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "3d",
    })
  );
}

if (process.env.NODE_ENV === "development") {
  loggerTransports.push(new transports.Console());
}

export const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "warn" : "debug",
  format: format.combine(format.timestamp(), format.simple()),
  transports: loggerTransports,
});

export const cookieLogger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.simple()),
  transports: isVercel
    ? []
    : [
        new DailyRotateFile({
          filename: path.join(logsDirectory, "cookies-%DATE%.log"),
          level: "info",
          datePattern: "YYYY-MM-DD",
          maxSize: "20m",
        }),
      ],
});
