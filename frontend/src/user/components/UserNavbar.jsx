import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/spacetrix-logo.png";

function UserNavbar() {
  return (
    <nav className="user-navbar">
      
      {/* BRAND */}
      <div className="brand">
        <img src={logo} alt="SPACETRIX logo" />
        <span>SPACETRIX</span>
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">
        <NavLink to="/user" end>
          Dashboard
        </NavLink>

        <NavLink to="/user/spaces">
          Spaces
        </NavLink>

        <NavLink to="/user/history">
          History
        </NavLink>

        <NavLink to="/user/support">
          Support
        </NavLink>
      </div>

    </nav>
  );
}

export default UserNavbar;
