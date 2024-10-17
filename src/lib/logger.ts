import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import fs from "fs";

const logsDirectory = path.join(process.cwd(), "logs");

if (!fs.existsSync(logsDirectory)) fs.mkdirSync(logsDirectory);

export const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "warn" : "debug",
  format: format.combine(format.timestamp(), format.simple()),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(logsDirectory, "error-%DATE%.log"),
      level: "warn",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new DailyRotateFile({
      filename: path.join(logsDirectory, "combined-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "3d",
    }),
  ],
});
