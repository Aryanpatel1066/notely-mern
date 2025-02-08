import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="navbarComponent">
      <div className="logo"><NavLink to="/">Notely</NavLink></div>
      <ul className="navLinks">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "navLink active" : "navLink"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? "navLink active" : "navLink"}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "navLink active" : "navLink"}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? "navLink active" : "navLink"}
          >
            Contact
          </NavLink>
        </li>
      </ul>

      {/* ✅ Show Profile Icon if Logged In, Else Show Login Button */}
      {user ? (
        <NavLink to="/profile" className="profileIcon">
          <FaUserCircle size={30} />
        </NavLink>
      ) : (
        <NavLink to="/login" className="loginButton">
          Login
        </NavLink>
      )}
    </div>
  );
}

export default Navbar;
