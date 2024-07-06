import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyJWTToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Please Login First"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Invalid Token"));
    }

    req.user = user;
    next();
  });
};
