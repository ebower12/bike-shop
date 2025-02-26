import "../css/nav-bar.css";
import { NavLink } from "react-router";

function NavBar() {
  return (
    <nav className="nav-bar">
      <NavLink className="nav-link" to="/" end>
        Home
      </NavLink>
      <NavLink className="nav-link" to="/internal" end>
        Management
      </NavLink>
    </nav>
  );
}

export default NavBar;
