import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const Profile: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="container">
      <div className="grid justify-between gap-2">
        <div className="rounded-sm p-5 shadow-lg">
          <div className="flex justify-end">
            <Link to="/update">
              <FaEdit />
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <figure className="group relative aspect-square w-32 overflow-hidden rounded-full transition-all">
              <img
                className="w-full object-cover"
                src={currentUser?.profilePicture}
                alt={currentUser?.username}
              />
            </figure>
          </div>

          <div className="mt-4">
            <div>
              <span>Username: </span>
              <span>{currentUser?.username}</span>
            </div>
            <div>
              <span>Email: </span>
              <span>{currentUser?.email}</span>
            </div>
          </div>
        </div>
        <div className="rounded-sm p-5 shadow-lg">
          <div>
            <h1 className="mb-3 text-center text-xl font-bold">Friends</h1>
          </div>
          <div className="flex flex-col gap-3">
            <section className="flex items-center gap-3 rounded-sm p-2 shadow-sm">
              <figure className="aspect-square w-full max-w-6 overflow-hidden rounded-full">
                <img src={currentUser?.profilePicture} alt="" />
              </figure>
              <h2>{currentUser?.username}</h2>
            </section>
            <section className="flex items-center gap-3 rounded-sm p-2 shadow-sm">
              <figure className="aspect-square w-full max-w-6 overflow-hidden rounded-full">
                <img src={currentUser?.profilePicture} alt="" />
              </figure>
              <h2>{currentUser?.username}</h2>
            </section>
            <section className="flex items-center gap-3 rounded-sm p-2 shadow-sm">
              <figure className="aspect-square w-full max-w-6 overflow-hidden rounded-full">
                <img src={currentUser?.profilePicture} alt="" />
              </figure>
              <h2>{currentUser?.username}</h2>
            </section>
            <section className="flex items-center gap-3 rounded-sm p-2 shadow-sm">
              <figure className="aspect-square w-full max-w-6 overflow-hidden rounded-full">
                <img src={currentUser?.profilePicture} alt="" />
              </figure>
              <h2>{currentUser?.username}</h2>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
