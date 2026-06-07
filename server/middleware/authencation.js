import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log(token);
    if (!token || !token.startsWith("Bearer")) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};
