import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRef, useState } from 'react';

import { FaFileUpload } from 'react-icons/fa';

const Profile: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      return setImageFile(e.target.files[0]);
    }

    return setImageFile(null);
  };
  return (
    <div className="container">
      <div className="grid justify-between gap-2">
        <div className="rounded-sm p-5 shadow-lg">
          <figure className="group relative aspect-square w-32 overflow-hidden rounded-full transition-all">
            <div className="pointer-events-none absolute inset-0 m-auto flex items-center justify-center bg-gray-700 bg-opacity-0 group-hover:bg-opacity-35">
              <FaFileUpload className="text-4xl text-white opacity-0 group-hover:opacity-100" />
            </div>
            <form action="">
              <input
                type="file"
                ref={imageUploadRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </form>
            <img
              className="w-full object-cover"
              src={currentUser?.profilePicture}
              alt={currentUser?.username}
              onClick={() => imageUploadRef.current?.click()}
            />
          </figure>
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
