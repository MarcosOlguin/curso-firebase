import { async } from "@firebase/util";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { connectStorageEmulator } from "firebase/storage";
import { useEffect, useState } from "react";
import { auth, userExists } from "../firebase/firebase.js";

import { Link, useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider.js";

function LoginView() {
  const navigate = useNavigate();
  // const [currentUser, setCurrentUser] = useState(null);
  /*
  State
  0:inicializado
  1:loading
  2:login completo
  3:login pero sin registro
  4: no hay nadie logueado
  5: ya existe username
  6:nuevo username click para continuar

  */
  const [state, setState] = useState(0);

  // useEffect(() => {
  //   setState(1);
  //   onAuthStateChanged(auth, handleUserStateChange);
  // }, []);

  // const handleUserStateChange = async (user) => {
  //   if (user) {
  //     const isRegistered = await userExists(user.uid);
  //     if (isRegistered) {
  //       //TO DO: redirigir dashboard
  //       navigate("/dashboard");
  //       setState(2);
  //     } else {
  //       //TO DO: redirigir a choose username
  //       navigate("/choose-username");
  //       setState(3);
  //       console.log(user.displayName);
  //     }
  //   } else {
  //     setState(4);
  //     console.log("No hay nadie auntenticado");
  //   }
  // };

  const handleClick = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);

    const signInWithGoogle = async (googleProvider) => {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
  };

  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };
  const handleUserNotRegistered = (user) => {
    navigate("/choose-username");
  };
  const handleUserNotLoggedIn = () => {
    setState(4);
  };

  if (state === 4) {
    return (
      <div>
        Login
        <button onClick={handleClick}>Login with Google</button>
      </div>
    );
  }

  if (state === 5) {
    return (
      <div>
        Login
        <button onClick={handleClick}>Login with Google</button>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Loading...</div>
    </AuthProvider>
  );
}

export default LoginView;
