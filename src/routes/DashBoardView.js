import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboadWrapper";
import { v4 as uuidv4 } from "uuid";
import {
  deleteLink,
  getLinks,
  insertNewLink,
  updateLink,
} from "../firebase/firebase";
import LinkComp from "../components/LinkComp";
import style from "./dashboardView.module.css";
import styleLinks from "../components/link.module.css";

function DashboardView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    setState(2);
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
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

  const addLink = async () => {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentUser.uid,
      };

      const res = await insertNewLink(newLink);
      console.log(res);
      newLink.docId = res.id;
      setTitle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addLink();
    setTitle("");
    setUrl("");
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

  const handleDeleteLink = async (docId) => {
    const tmp = links.filter((e) => e.docId !== docId);
    setLinks([...tmp]);
    await deleteLink(docId);
  };

  const handleUpdateLink = async (docId, title, url) => {
    const link = links.find((item) => item.docId === docId);
    link.title = title;
    link.url = url;
    await updateLink(docId, link);
  };

  return (
    <div className={style.container}>
      <h1>DashBoard</h1>
      <form
        className={style.entryContainer}
        action=""
        onSubmit={handleOnSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          className="input"
          type="text"
          name="title"
          onChange={handleOnChange}
        ></input>

        <label htmlFor="url">Url</label>
        <input
          className="input"
          type="text"
          onChange={handleOnChange}
          name="url"
        ></input>

        <input className="btn" type="submit" value="Crear nuevo link"></input>
      </form>
      <div className={styleLinks.linksContainer}>
        {links.map((e, i) => (
          <LinkComp
            key={i}
            docId={e.docId}
            url={e.url}
            title={e.title}
            onDelete={handleDeleteLink}
            onUpdate={handleUpdateLink}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardView;
