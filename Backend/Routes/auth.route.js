import express from "express";
import {
  register,
  login,
  googleAuth,
  signout,
} from "../Controller/auth.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleAuth);
router.get("/signout", signout);

export default router;
