import { FormEvent } from "react";
import { GoogleAuthProvider, signInWithPopup ,getAuth } from "firebase/auth"
import { app } from "../firebase";

function GAuth() {

  const handleGoogleClick = async(e:FormEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    try{
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider);
   

      const { displayName, email, photoURL } = result.user
      const res = await fetch('api/auth/google', {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          name : displayName,
          email,
          photo : photoURL
        })
      })
  
    }catch(error){ 
      console.log(error)
    }
  }


  return (
    <button onClick={handleGoogleClick} type="button" className="text-center bg-red-600 text-white w-full py-3 block rounded-sm hover:bg-red-400">
       Continue With Google 
    </button>
  )
} 

export default GAuth
