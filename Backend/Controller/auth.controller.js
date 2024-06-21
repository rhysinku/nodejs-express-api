import User from "../Model/userDetails.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../Utils/error.js";


// jwt Secret
const JWT_SECRET =
  "pockeypeperoaj==12i3uppupsaudioahsdjnzpkmcdknhbv210312ie9qwusiadjlncshdbasgdcnahsxjkdsadma";

export const register = async (req, res , next) => {
    const {uname , email, password} = req.body;
    const hashPassword = bcryptjs.hashSync(password , 10) 
    try {
        const emailExist = await User.findOne({email})
        if(emailExist){
          next(errorHandler(401, "Email Exist"))
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
      next(error)
    } 
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        next(errorHandler(401, "No User Found"))
      }
  
      if (bcryptjs.compareSync(password, user.password)) {
        const accToken = jwt.sign({id : user._id}, JWT_SECRET);
        const { password , ...rest} = user._doc
        if (res.status(200)) {
          res.cookie("access_token" , accToken,{ httpOnly: true}).status(200).json(rest)
          
        } else {
          next(errorHandler(401, "Invalid Creditial"))
        }
      }
    } catch (error) {
      next(error)
    }
  }