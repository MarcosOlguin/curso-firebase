import { async } from "@firebase/util";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboadWrapper";
import {
  getProfilePhotoUrl,
  setUserProfilePhoto,
  updateUser,
  updateUsername,
} from "../firebase/firebase";
import style from "./EditProfileView.module.css";
import img from "../imgs/sinPerfil.jpg";

function EditProfileView() {
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [profileUrl, setProfileUrl] = useState(null);

  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();
  const fileRef = useRef();
  const userRef = useRef();

  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    const url = await getProfilePhotoUrl(user.profilePicture);
    setProfileUrl(url);
    setState(2);

    console.log(user);
  };
  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };
  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };

  const handleOpenFilePicker = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleUsernameChange = (e) => {
    console.log(e.target.value);
    setCurrentUser({ ...currentUser, username: e.target.value });
  };

  const handleBlur = async () => {
    setEdit(false);
    await updateUsername(currentUser.uid, currentUser);
  };
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, [edit]);

  const handleChangeFile = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();

    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;

        const res = await setUserProfilePhoto(currentUser.uid, imageData);

        if (res) {
          const tmpUser = { ...currentUser };
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({ ...tmpUser });
          const url = await getProfilePhotoUrl(currentUser.profilePicture);
          setProfileUrl(url);
        }
      };
    }
  };

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <DashboardWrapper>
        <div className="container">
          <h2>Edit Profile Info</h2>
          <div className={style.profilePictureContainer}>
            {!edit ? (
              <>
                <div>
                  <span className={style.span}>{currentUser.username}</span>

                  <button className={style.btnEdit}>
                    <span
                      className="material-icons"
                      onClick={() => {
                        setEdit(true);
                      }}
                    >
                      edit
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <div>
                <input
                  className={style.input}
                  value={currentUser.username}
                  ref={userRef}
                  onChange={handleUsernameChange}
                  onBlur={handleBlur}
                />
                <button className={style.btnConfirm}>Confirm</button>
              </div>
            )}

            <div>
              {profileUrl ? (
                <img src={profileUrl} alt="profile-img" width={100} />
              ) : (
                <img src={img} />
              )}
            </div>
            <div>
              <button className="btn" onClick={handleOpenFilePicker}>
                Choose new profile picture
              </button>
              <input
                className={style.fileInput}
                ref={fileRef}
                type="file"
                onChange={handleChangeFile}
              />
            </div>
          </div>
        </div>
      </DashboardWrapper>
    </AuthProvider>
  );
}

export default EditProfileView;
