import express from "express";
import {test , register , login} from "../Controller/user.controller.js";
const router = express.Router();


router.get('/', test )


// Register User
router.post("/register", register);
  
  router.post("/login", login );
  



export default router;