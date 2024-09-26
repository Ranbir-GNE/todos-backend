const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {});
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

module.exports = {
  dbConnection,
};
