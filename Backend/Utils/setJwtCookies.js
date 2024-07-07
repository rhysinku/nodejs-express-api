import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

export const createSignToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  const expiryDate = new Date(Date.now() + 5 * 60 * 60 * 1000);

  res.cookie("access_token", token, {
    expires: expiryDate,
    // httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  const { password, ...rest } = user._doc;

  res.status(statusCode).json({
    currentUser: rest,
  });
};
