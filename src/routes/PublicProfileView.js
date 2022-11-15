import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PublicLink from "../components/PublicLink";
import {
  existsUsername,
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
} from "../firebase/firebase";
import style from "./publicProfileView.module.css";
import img from "../imgs/link-icon.png";

function PublicProfileView() {
  const [profile, setProfile] = useState();
  const [url, setUrl] = useState("");
  const [state, setState] = useState(0);

  const { username } = useParams();

  useEffect(() => {
    getProfile();

    async function getProfile() {
      try {
        const userId = await existsUsername(username);
        if (userId) {
          const userInfo = await getUserPublicProfileInfo(userId);
          if (userInfo) {
            setProfile(userInfo);
          }

          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          setUrl(url);
        } else {
          setState(7);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [username]);

  if (state === 7) {
    return (
      <div>
        <h1>Username no existe</h1>
      </div>
    );
  }

  return (
    <>
      <nav className={style.navbar}>
        <Link to="/" className={style.imgContainer}>
          <img src={img} />
          <span>CreaLinks</span>
        </Link>
      </nav>
      <div className={style.profileContainer}>
        <div className={style.profilePicture}>
          <img src={url} />
        </div>
        <h2>{profile?.profileInfo.username}</h2>
        <h3>{profile?.profileInfo.displayName}</h3>
        <div>
          {profile?.linksInfo.map((e) => (
            <PublicLink key={e.docId} url={e.url} title={e.title} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PublicProfileView;
