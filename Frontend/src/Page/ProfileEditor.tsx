import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { ChangeEvent, useEffect, useRef, useState, FormEvent } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from 'firebase/storage';
import { FaFileUpload } from 'react-icons/fa';
import { app } from '../firebase';

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
} from '../redux/user/userSlice';

interface UpdateProfileType {
  username?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
}

const ProfileEditor: React.FC = () => {
  const { currentUser, updateLoading, updateError } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>();
  const [imageUploadProgress, setImageUploadProgress] = useState<number>(0);
  const [imageUploadError, setImageUploadError] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<UpdateProfileType>({});
  const [updateMessage, setUpdateMessage] = useState<string>('');
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
          setProfileData({ ...profileData, profilePicture: downloadURL });
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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password, profilePicture } = profileData;
    try {
      setUpdateMessage('');
      dispatch(updateUserStart());
      const res = await fetch(
        `http://localhost:1234/api/user/update/${currentUser?._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            profilePicture,
          }),
          credentials: 'include',
        }
      );

      const data = await res.json();
      setUpdateMessage('Profile updated successfully');
      dispatch(updateUserSuccess(data));
    } catch (err) {
      dispatch(updateUserFailed(err));
      setUpdateMessage('');
      console.log(err);
    }
  };

  const getProtectedData = async () => {
    try {
      const response = await fetch('http://localhost:1234/api/auth/protected', {
        method: 'GET',
        credentials: 'include', // This is important to include cookies in the request
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error fetching protected data', error);
    }
  };

  return (
    <div className="container">
      <div className="mx-auto flex w-5/6 max-w-5xl flex-col gap-2 p-3 shadow-sm">
        <h2 className="text-center text-4xl font-bold">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex flex-col items-center">
              <figure className="group relative aspect-square w-80 overflow-hidden rounded-full transition-all">
                <div className="pointer-events-none absolute inset-0 m-auto flex items-center justify-center bg-gray-700 bg-opacity-0 group-hover:bg-opacity-35">
                  <FaFileUpload className="text-4xl text-white opacity-0 group-hover:opacity-100" />
                </div>

                <input
                  type="file"
                  ref={imageUploadRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleInputFile}
                />

                <img
                  className="w-full object-cover"
                  src={
                    profileData?.profilePicture || currentUser?.profilePicture
                  }
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
          </div>

          <div className="mx-auto my-2 flex w-10/12 max-w-xl flex-col gap-2">
            <div className="overflow-hidden rounded shadow-sm">
              <input
                className="box-content block h-full w-full bg-gray-200 px-2 py-3"
                type="text"
                name="username"
                defaultValue={currentUser?.username}
                onChange={handleOnChange}
              />
            </div>
            <div className="overflow-hidden rounded shadow-sm">
              <input
                className="box-content block h-full w-full bg-gray-200 px-2 py-3"
                type="email"
                name="email"
                defaultValue={currentUser?.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="overflow-hidden rounded shadow-sm">
              <input
                className="box-content block h-full w-full bg-gray-200 px-2 py-3"
                type="password"
                name="password"
                placeholder="password"
                onChange={handleOnChange}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded bg-blue-900 py-4 text-white"
            >
              {updateLoading ? 'Updating...' : '   Update Profile'}
            </button>
            {updateError && <span>{updateError}</span>}
            {updateMessage && <span>{updateMessage}</span>}
          </div>
        </form>
        <div className="flex justify-between gap-1">
          <button className="rounded-sm bg-orange-700 p-2 text-center font-bold text-white">
            Delete Account
          </button>
          <button
            className="rounded-sm bg-violet-700 p-2 text-center font-bold text-white"
            onClick={getProtectedData}
          >
            Get Protected Data
          </button>

          <button className="rounded-sm bg-red-700 p-2 text-center font-bold text-white">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
