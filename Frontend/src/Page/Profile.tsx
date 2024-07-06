import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect, useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from 'firebase/storage';
import { app } from '../firebase';

import { FaFileUpload } from 'react-icons/fa';

const Profile: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>();
  const [imageUploadProgress, setImageUploadProgress] = useState<number>(0);
  const [imageUploadError, setImageUploadError] = useState<boolean>(false);
  const [imageUploadUrl, setimageUploadUrl] = useState<string>('');
  useEffect(() => {
    if (imageFile) {
      handleFileUpload(imageFile);
    }
  }, [imageFile]);

  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot: UploadTaskSnapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(Math.round(progress));
        setImageUploadError(false);
      },
      () => {
        setImageUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageUploadUrl(downloadURL);
          setImageUploadError(false);
        });
      }
    );
  };

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      return setImageFile(e.target.files[0]);
    }
    return setImageFile(null);
  };

  return (
    <div className="container">
      <div className="grid justify-between gap-2">
        <div className="rounded-sm p-5 shadow-lg">
          <div className="flex flex-col items-center">
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
                  onChange={handleInputFile}
                />
              </form>
              <img
                className="w-full object-cover"
                src={imageUploadUrl || currentUser?.profilePicture}
                alt={currentUser?.username}
                onClick={() => imageUploadRef.current?.click()}
              />
            </figure>

            {imageUploadError && (
              <span className="bg-red-700 font-bold">Error In Uploading</span>
            )}

            {imageUploadProgress === 0 ? (
              <div className="hidden"></div>
            ) : (
              <div className="mt-8 w-full">
                <div className="bg-stroke dark:bg-dark-3 relative h-4 w-full rounded-2xl">
                  <div
                    className="absolute left-0 top-0 flex h-full items-center justify-center rounded-2xl bg-green-500 text-xs font-semibold text-white"
                    style={{
                      width: `${imageUploadProgress}%`,
                    }}
                  >
                    {imageUploadProgress}%
                  </div>
                </div>
              </div>
            )}
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
