import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyJWTToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.send({
      token: req.cookies,
      message: "You are not authenticated",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
      });
      return next(errorHandler(403, "Invalid Token"));
    }

    req.user = user;
    next();
  });
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
    req.user = decoded;
    next();
  });
};
