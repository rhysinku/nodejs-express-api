import express from "express";
import { test, updateUser, deleteUser } from "../Controller/user.controller.js";
import { verifyJWTToken } from "../Utils/verifyJWTToken.js";
const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyJWTToken, updateUser);
router.delete("/delete/:id", verifyJWTToken, deleteUser);

export default router;
