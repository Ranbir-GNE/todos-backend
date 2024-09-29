const {
  login,
  register,
  findUserById,
  getUserFromToken,
} = require("../controllers/usersController.cjs");
const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/find-user/:id", findUserById);
router.get("/get-user", getUserFromToken);

module.exports = router;
