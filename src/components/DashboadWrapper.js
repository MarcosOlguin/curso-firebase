import { Link, useLocation } from "react-router-dom";
import style from "./dashboardWrapper.module.css";
import img from "../imgs/link-icon.png";

function DashboardWrapper({ children }) {
  let location = useLocation();
  console.log(location.pathname);
  let url = location.pathname;
  return (
    <div>
      <nav className={style.nav}>
        <Link to="/" className={style.logo}>
          <img src={img} />
          <span>CreaLinks</span>
        </Link>
        <Link className={url === "/" ? style.path : style.a} to="/">
          Home
        </Link>
        <Link
          className={url === "/dashboard" ? style.path : style.a}
          to="/dashboard"
        >
          Links
        </Link>
        <Link
          className={url === "/dashboard/profile" ? style.path : style.a}
          to="/dashboard/profile"
        >
          Profile
        </Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}

export default DashboardWrapper;
