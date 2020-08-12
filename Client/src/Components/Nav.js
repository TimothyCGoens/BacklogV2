import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "../history";

// import { withRouter } from 'react-router-dom'

class Nav extends React.Component {
  handleLogoutClick = () => {
    localStorage.removeItem("jsonwebtoken");
    this.props.onLogout();
    history.push("/login");
  };

  render() {
    return (
      <div className="nav">
        <nav>
          <h1 className="app-header">Backlog App</h1>
          <ul className="navbar">
            {!this.props.isAuthenticated ? (
              <Link className="link-style" to="/register">
                <li>Register</li>
              </Link>
            ) : null}
            {!this.props.isAuthenticated ? (
              <Link className="link-style" to="/login">
                <li>Log In</li>
              </Link>
            ) : null}
            <Link className="link-style" to="/profile">
              <li>Profile</li>
            </Link>
            <Link className="link-style" to="/search">
              <li>Search</li>
            </Link>
            {this.props.isAuthenticated ? (
              <Link className="link-style" to="/backlog">
                <li>Backlog</li>
              </Link>
            ) : null}
            {this.props.isAuthenticated ? (
              <Link className="link-style" to="">
                <li onClick={this.handleLogoutClick}>Logout</li>
              </Link>
            ) : null}
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch({ type: "LOGOUT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
