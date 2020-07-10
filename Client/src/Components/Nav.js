import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <nav>
        <h1 className="app-header">Backlog App</h1>
        <ul className="navbar">
          <Link className="link-style" to="register">
            <li>Register</li>
          </Link>
          <Link className="link-style" to="login">
            <li>Log In</li>
          </Link>
          <Link className="link-style" to="profile">
            <li>Profile</li>
          </Link>
          <Link className="link-style" to="search">
            <li>Search</li>
          </Link>
          <Link className="link-style" to="backlog">
            <li>Backlog</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
