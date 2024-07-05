import { useSelector } from "react-redux"
import { RootState } from "../redux/store"


const Profile: React.FC = () => {

    const {currentUser} = useSelector((state:RootState) => state.user)

  return (
   <div className="container">
    <div className="grid justify-between gap-2">
    <div className="shadow-lg p-5 rounded-sm">
        <figure className="w-32 aspect-square"><img className="w-full object-cover" src={currentUser?.profilePicture} alt={currentUser?.username} /></figure>
        <div className="mt-4">
          <div><span>Username: </span><span>{currentUser?.username}</span></div>
          <div><span>Email: </span><span>{currentUser?.email}</span></div>
        </div>
      </div>
      <div className="shadow-lg p-5 rounded-sm">
      <div>
        <h1 className="text-center mb-3 text-xl font-bold">Friends</h1>
      </div>
      <div className="flex flex-col gap-3">
        <section className="flex gap-3 items-center shadow-sm rounded-sm p-2">
          <figure><img src={currentUser?.profilePicture} alt="" /></figure>
          <h2>{currentUser?.username}</h2>
        </section>
        <section className="flex gap-3 items-center shadow-sm rounded-sm p-2">
          <figure><img src={currentUser?.profilePicture} alt="" /></figure>
          <h2>{currentUser?.username}</h2>
        </section>
        <section className="flex gap-3 items-center shadow-sm rounded-sm p-2">
          <figure><img src={currentUser?.profilePicture} alt="" /></figure>
          <h2>{currentUser?.username}</h2>
        </section>
        <section className="flex gap-3 items-center shadow-sm rounded-sm p-2">
          <figure><img src={currentUser?.profilePicture} alt="" /></figure>
          <h2>{currentUser?.username}</h2>
        </section>
      </div>
      </div> 
    </div>
   </div>
  )
}

  

export default Profile
