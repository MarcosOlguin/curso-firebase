import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboadWrapper";
import { v4 as uuidv4 } from "uuid";

function DashboardView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  const handleUserLoggedIn = (user) => {
    setCurrentUser(user);
    setState(2);
  };
  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };
  const handleUserNotLoggedIn = () => {
    navigate("/login");
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addLink();
  };

  const addLink = () => {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentUser.uid,
      };

      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTitle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "title") {
      setTitle(value);
    }
    if (e.target.name === "url") {
      setUrl(value);
    }
  };
  return (
    <DashboardWrapper>
      <div>
        <h1>DashBoard</h1>
        <form action="" onSubmit={handleOnSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={handleOnChange}></input>

          <label htmlFor="url">Url</label>
          <input type="text" name="url"></input>

          <input type="submit" value="Crear nuevo link"></input>
        </form>
      </div>
      ;
    </DashboardWrapper>
  );
}

export default DashboardView;
