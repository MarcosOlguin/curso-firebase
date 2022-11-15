import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import { logout } from "../firebase/firebase";

function SignOutView() {
  const navigate = useNavigate();
  const handleUserLoggedIn = async (user) => {
    await logout();
  };
  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };
  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };
  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    ></AuthProvider>
  );
}

export default SignOutView;
