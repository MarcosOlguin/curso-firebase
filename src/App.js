import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import AuthProvider from "./components/AuthProvider";
import DashboardWrapper from "./components/DashboadWrapper";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    setState(2);
  };
  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };
  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };

  const hanldeClick = () => {
    setCopied(true);
  };

  if (state === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      ></AuthProvider>
    );
  }
  return (
    <div className="App">
      <DashboardWrapper>
        <div className="container">
          <h2>Home</h2>
          <div>
            <h3>Public Profile</h3>
            <p>Your link to share is the following:</p>
            <div className="link-container">
              <a
                href={`https://crealinks.vercel.app/u/${currentUser.username}`}
              >
                https://crealinks.vercel.app/u/{currentUser.username}
              </a>
              <CopyToClipboard
                text={`https://crealinks.vercel.app/u/${currentUser.username}`}
              >
                <button
                  className={copied ? "copied" : "no-copied"}
                  onClick={hanldeClick}
                >
                  {copied ? "Copied!" : "Copy"}
                  <span className="material-icons">
                    <span className="material-symbols-outlined">
                      content_copy
                    </span>
                  </span>
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </DashboardWrapper>
    </div>
  );
}

export default App;
