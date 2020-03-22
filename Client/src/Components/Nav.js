import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <nav>
        <h1>Backlog App</h1>
        <ul className="navbar">
          <Link to="register">
            <li>
              <button>Register</button>
            </li>
          </Link>
          <Link to="login">
            <li>
              <button>Log In</button>
            </li>
          </Link>
          <Link to="profile">
            <li>
              <button>Profile</button>
            </li>
          </Link>
          <Link to="search">
            <li>
              <button>Search</button>
            </li>
          </Link>
          <Link to="backlog">
            <li>
              <button>Backlog</button>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
