import express from "express";
import {register , login} from "../Controller/auth.controller.js";
const router = express.Router();




router.post("/register" , register)
router.post("/login" , login)
router.post("/google" , login)




export default router;