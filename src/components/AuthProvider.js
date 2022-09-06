import { async } from "@firebase/util";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { connectStorageEmulator } from "firebase/storage";
import { useEffect, useState } from "react";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExists,
} from "../firebase/firebase.js";

import { useNavigate } from "react-router-dom";

function AuthProvider({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, handleUserStateChange);
  }, []);

  const handleUserStateChange = async (user) => {
    if (user) {
      const isRegistered = await userExists(user.uid);
      if (isRegistered) {
        //TO DO: redirigir dashboard
        const userInfo = await getUserInfo(user.uid);
        if (userInfo.processCompleted) {
          onUserLoggedIn(user);
        } else {
          onUserNotRegistered(userInfo);
        }
      } else {
        //TO DO: redirigir a choose username
        await registerNewUser({
          uid: user.uid,
          displayName: user.displayName,
          profilePicture: "",
          username: "",
          processCompleted: false,
        });
        onUserNotRegistered(user);
      }
    } else {
      onUserNotLoggedIn();
    }
  };

  return <div>{children}</div>;
}

export default AuthProvider;
