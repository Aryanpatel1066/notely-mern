import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbarComponent">
      <div className="logo">Notely</div>
      <ul className="navLinks">
        <li>
          <NavLink to="/" className="navLink" activeClassName="activeLink">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className="navLink"
            activeClassName="activeLink"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="navLink" activeClassName="activeLink">
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className="navLink"
            activeClassName="activeLink"
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <NavLink to="/login" className="loginButton">
        Login
      </NavLink>
    </div>
  );
}

export default Navbar;
