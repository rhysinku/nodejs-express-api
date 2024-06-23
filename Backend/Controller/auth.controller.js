import User from "../Model/userDetails.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../Utils/error.js";

// jwt Secret
const JWT_SECRET =
  "pockeypeperoaj==12i3uppupsaudioahsdjnzpkmcdknhbv210312ie9qwusiadjlncshdbasgdcnahsxjkdsadma";

export const register = async (req, res, next) => {
  const { uname, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return next(errorHandler(401, "Email Exist"));
    }

    await User.create({
      username: uname,
      email,
      password: hashPassword,
    });
    res.send({
      status: "Account Register",
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(401, "No User Found"));
    }

    if (bcryptjs.compareSync(password, user.password)) {
      const accToken = jwt.sign({ id: user._id }, JWT_SECRET);
      const { password, ...rest } = user._doc;

      const expiryDate = new Date(Date.now() + 35000);

      return res
        .cookie("access_token", accToken, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .send(rest);
    }
    return next(errorHandler(401, "Invalid Wrong Password"));
  } catch (error) {
    return next(error);
  }
};
