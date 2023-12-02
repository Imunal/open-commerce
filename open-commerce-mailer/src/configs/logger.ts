import * as dotenv from "dotenv";

import { pino } from "pino";

import prettyPkg from "pino-pretty";
const pretty = prettyPkg.default;

dotenv.config({ path: "./.env" });

const isDevelopment = process.env.NODE_ENV !== "production";
const stream = isDevelopment ? pretty() : process.stdout;

export const logger = pino(
  {
    level: "info",
  },
  stream
);
