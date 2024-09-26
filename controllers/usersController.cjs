const { userModel } = require("../models/userSchema.cjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const user = new userModel({
      userName,
      email,
      password,
    });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    if (!token) {
      return res.status(400).json({ message: "Token not generated" });
    }
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { register, login };
