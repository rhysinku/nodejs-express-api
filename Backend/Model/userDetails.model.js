import mongoose  from "mongoose";

const UserDetailsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: { type: String, unique: true , required: true },
    password: {
      type: String,
      required: true
    },
    profilePicture :{
      type: String,
      default: `https://picsum.photos/300/300?random`
    }
  },{timestamps:true,
    collection: "UserDetails",
  }
);
 
const User = mongoose.model("UserDetails", UserDetailsSchema);

export default User