import { Link } from "react-router-dom";
import "../assets/css/Navbar.css";

const Navbar = () => {

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (

    <nav className="navbar">

      <div className="logo">
        Digital Library
      </div>

      <div className="nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <span className="user-name">
          {user?.name}
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;