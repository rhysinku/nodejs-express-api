import express from "express";
import {
  register,
  login,
  googleAuth,
  signOut,
  verifyUserToken,
} from "../Controller/auth.controller.js";
import { verifyJWTToken } from "../Utils/verifyJWTToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleAuth);
router.get("/signout", signOut);
router.get("/protected", verifyJWTToken, verifyUserToken);

export default router;
