import User from "../Model/userDetails.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../Utils/error.js";
import { createSignToken } from "../Utils/setJwtCookies.js";

// jwt Secret

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return next(errorHandler(401, "Email Exist"));
    }

    const newUser = await User.create({
      username: username,
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
      return createSignToken(user, 200, req, res);
    }
    return next(errorHandler(401, "Invalid Wrong Password"));
  } catch (error) {
    return next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      createSignToken(user, 200, req, res);

      // const accToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
      // const { password, ...rest } = user._doc;
      // const expiryDate = new Date(Date.now() + 35000);
      // return res
      //   .cookie("access_token", accToken, {
      //     httpOnly: true,
      //     expire: expiryDate,
      //   })
      //   .status(200)
      //   .send(rest);
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatePassword, 10);
      const googleUsername =
        name.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 10000);
      const expiryDate = new Date(Date.now() + 35000);

      const googleUser = new User({
        username: googleUsername,
        email,
        password: hashPassword,
        profilePicture: photo,
      });

      await googleUser.save();
      createSignToken(googleUser, 200, req, res);
      // const accToken = jwt.sign(
      //   { id: googleUser._id },
      //   process.env.JWT_SECRET_KEY
      // );

      // return res
      //   .cookie("access_token", accToken, {
      //     httpOnly: true,
      //     expire: expiryDate,
      //   })
      //   .status(200)
      //   .send(googleUser);
    }
  } catch (error) {
    return next(errorHandler(401, "Google Auth Failed"));
  }
};

export const signout = async (req, res, next) => {
  res.clearCookie("access_token").status(200).json("sign out");
};
