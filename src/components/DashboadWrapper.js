import { Link } from "react-router-dom";
import style from "./dashboardWrapper.module.css";
import img from "../imgs/link-icon.png";

function DashboardWrapper({ children }) {
  return (
    <div>
      <nav className={style.nav}>
        <Link to="/" className={style.logo}>
          <img src={img} />
          <span>CreaLinks</span>
        </Link>
        <Link className={style.a} to="/dashboard">
          Links
        </Link>
        <Link className={style.a} to="/dashboard/profile">
          Profile
        </Link>
        <Link className={style.a} to="/signout">
          Signout
        </Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}

export default DashboardWrapper;
