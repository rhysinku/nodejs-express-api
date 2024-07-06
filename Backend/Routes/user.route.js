import express from "express";
import { test, updateUser } from "../Controller/user.controller.js";
const router = express.Router();

router.get("/", test);
router.get("/update", updateUser);

export default router;
