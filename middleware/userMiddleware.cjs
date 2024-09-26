const jwt = require("jsonwebtoken");

const userMiddleware = (req, res, next) => {
  const headers = req.headers;
  if (!headers) {
    return res.status(401).json({ message: "No headers found" });
  }
  const token = headers.authorization;
  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    console.log(decode);
    req.id = decode.userid;

    next();
  } catch {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = userMiddleware;
