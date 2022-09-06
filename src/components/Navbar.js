import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Flipkart
        </Link>
        <ul id="nav-mobile" className="right ">
          {token ? (
            <li>
              <i
                style={{ cursor: "pointer", padding: "0 20px" }}
                className="material-icons large"
                onClick={handleLogout}
              >
                logout
              </i>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
          <li>
            <i
              style={{ cursor: "pointer" }}
              className="material-icons large"
              onClick={() => {
                navigate("/cart");
              }}
            >
              shopping_cart
            </i>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
