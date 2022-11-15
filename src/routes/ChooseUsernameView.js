import AuthProvider from "../components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { existsUsername, updateUser } from "../firebase/firebase";
import { upload } from "@testing-library/user-event/dist/upload";
import style from "./chooseUsername.module.css";

function ChooseUsernameView() {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [userName, setUserName] = useState("");

  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };
  const handleUserNotRegistered = (user) => {
    setCurrentUser(user);
    setState(3);
  };
  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };

  const handleInputUsername = (e) => {
    setUserName(e.target.value);
  };

  const handleContinue = async () => {
    if (userName !== "") {
      const exists = await existsUsername(userName);
      if (exists) {
        setState(5);
      } else {
        const tmp = { ...currentUser };
        tmp.username = userName;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setState(6);
      }
    }
  };

  if (state === 3 || state === 5) {
    return (
      <div className={style.chooseUsernameContainer}>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Para terminar el proceso elige un nombre de usuario</p>
        {state === 5 ? <p>El nombre de usuario ya existe escoge otro</p> : ""}
        <div>
          <input type="text" onChange={handleInputUsername} />
        </div>
        <div>
          <button className="btn" onClick={handleContinue}>
            Continuar
          </button>
        </div>
      </div>
    );
  }
  if (state === 6) {
    return (
      <div className={style.chooseUsernameContainer}>
        <h1>Felicidades! ya puedes ir al dashboard</h1>
        <Link to="/dashboard" className="btn">
          Continuar
        </Link>
      </div>
    );
  }
  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    ></AuthProvider>
  );
}

export default ChooseUsernameView;
