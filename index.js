const express = require("express");
const { dbConnection } = require("./config/dbconnect.cjs");
const app = express();
const cors = require("cors");
const todoRouter = require("./routes/todoRoutes.cjs");
const userRouter = require("./routes/userRoutes.cjs");
const userMiddleware = require("./middleware/userMiddleware.cjs");
require("dotenv").config();
const fs = require("fs");
const { format } = require("date-fns");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnection();
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});

function logger(req, res, next) {
  const clientIp = req.ip || req.connection.remoteAddress;
  const accessedUrl = req.originalUrl;
  const formattedDate = format(new Date(), "dd-mm-yyyy:hh:mm:ss");
  const method = req.method;
  const logEntry = `Date: ${formattedDate} - IP: ${clientIp}, URL: ${accessedUrl} Method: ${method}\n`;

  try {
    fs.appendFile("./logger.txt", logEntry, (err) => {
      if (err) {
        console.error("Failed to write log:", err);
      }
    });
    next();
  } catch (error) {
    console.error("Failed to write log:", error);
  }
}

app.use(logger);

app.use("/api/todos", userMiddleware, todoRouter);
app.use("/api/user", userRouter);
