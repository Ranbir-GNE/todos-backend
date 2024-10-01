const express = require("express");
const { dbConnection } = require("./config/dbconnect.cjs");
const app = express();
const cors = require("cors");
const todoRouter = require("./routes/todoRoutes.cjs");
const userRouter = require("./routes/userRoutes.cjs");
const userMiddleware = require("./middleware/userMiddleware.cjs");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

dbConnection();
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});

var corsOptions = {
  origin: "https://todos-backend-rouge.vercel.app/api/todos",
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use("/api/todos", userMiddleware, todoRouter);
app.use("/api/user", userRouter);
