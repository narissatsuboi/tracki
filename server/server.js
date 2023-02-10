const dotenv = require("dotenv");
dotenv.config({ path: require("find-config")(".env") });
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require(path.join(
  __dirname,
  "middleware",
  "errorHandler"
));
const { logger, requestLogger, errorLogger } = require(path.join(
  __dirname,
  "common",
  "logging",
  "index"
));

// db
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const startDefaultConn = require(path.join(__dirname, "data", "defaultConn"));
startDefaultConn(process.env.MONGO_URI);

// register middleware
app.use(requestLogger);
app.use(errorLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/", require(path.join(__dirname, "routes", "root")));
app.use("/records", require(path.join(__dirname, "routes", "records")));

// custom error handler middleware
app.use(errorHandler);

// if db connected, listen on server
mongoose.connection.once("open", () => {
  logger.info(`Connected to MongoDB on default connection`);
  app.listen(PORT, () => logger.info(`Server is running on port: ${PORT}`));

  mongoose.connection.on("disconnect", (err) => {
    console.log(err);
  });
});
