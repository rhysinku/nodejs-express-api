import User from "../Model/userDetails.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/error.js";

export const register = async (req, res , next) => {
    const {uname , email, password} = req.body;
    const hashPassword = bcryptjs.hashSync(password , 10) 
    try {
        const emailExist = await User.findOne({email})
        if(emailExist){
          next(errorHandler(500, "Oh no, Email Exist"))
        }

        await User.create({
            username: uname,
            email,
            password : hashPassword,
        })
        res.send({
            status : "Account Register",
        })

    }
    catch(error){
      next(errorHandler(500, "Oh no, something went wrong"))
    }
}



export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.send({ status: "No User Found" });
      }
  
      if (password === user.password) {
        const accToken = jwt.sign({}, JWT_SECRET);
  
        if (res.status(200)) {
          return res.send({ status: "Account Login", accToken });
        } else {
          return res.send({
            status: "Incorrect Details",
            accToken,
          });
        }
      }
    } catch (error) {
      return res.send(error);
    }
  }