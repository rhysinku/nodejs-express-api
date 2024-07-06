import jwt from "jsonwebtoken";

export const verifyJWTToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("Not Authenticated");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json("Invalid Token");
    }

    req.user = user;
    next();
  });
};
