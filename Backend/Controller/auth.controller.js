import User from "../Model/userDetails.model.js";


export const register = async (req, res) => {
    const {uname , email, password} = req.body;
    try {
        const emailExist = await User.findOne({email})
        if(emailExist){
            return res.send({status: "Email Existed"})
        }

        await User.create({
            username: uname,
            email,
            password,
        })
        res.send({
            status : "Account Register",
        })

    }
    catch(error){
        res.send(error)
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