import express from "express";
import { test, updateUser } from "../Controller/user.controller.js";
import { verifyJWTToken } from "../Utils/verifyJWTToken.js";
const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyJWTToken, updateUser);

export default router;
