import { stringLength } from "@firebase/util";
import style from "./publicLink.module.css";

function PublicLink({ url, title }) {
  return (
    <a href={url} className={style.publicLinkContainer}>
      <div>{title}</div>
    </a>
  );
}

export default PublicLink;
