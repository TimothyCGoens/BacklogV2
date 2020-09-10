import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "../history";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

// import { withRouter } from 'react-router-dom'

class NavigationBar extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleLogoutClick = () => {
    localStorage.removeItem("jsonwebtoken");
    this.props.onLogout();
    history.push("/home");
  };

  render() {
    return (
      <div>
        <Navbar fixed="top" color="light" light expand="md">
          <NavbarBrand tag={Link} to="/home">
            the backlog
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {!this.props.isAuthenticated ? (
                <NavItem>
                  <NavLink className="current" tag={Link} to="/register/">
                    Register
                  </NavLink>
                </NavItem>
              ) : null}
              <NavItem>
                <NavLink tag={Link} to="/search/">
                  Search
                </NavLink>
              </NavItem>
              {this.props.isAuthenticated ? (
                <NavItem>
                  <NavLink tag={Link} to="/profile/">
                    Profile
                  </NavLink>
                </NavItem>
              ) : null}
            </Nav>
            {!this.props.isAuthenticated ? (
              <NavItem>
                <NavLink tag={Link} to="/login/">
                  Log In
                </NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <NavLink onClick={this.handleLogoutClick} tag={Link} to="/home">
                  Log Out
                </NavLink>
              </NavItem>
            )}
          </Collapse>
        </Navbar>
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
    onLogout: () => dispatch({ type: "LOG_OUT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);

// <nav>
//   <h1 className="app-header">The Backlog</h1>
//   <ul className="navbar">
//     {!this.props.isAuthenticated ? (
//       <Link className="link-style" to="/register">
//         <li>Register</li>
//       </Link>
//     ) : null}

//     {this.props.isAuthenticated ? (
//       <Link className="link-style" to="/profile">
//         <li>Profile</li>
//       </Link>
//     ) : null}
//     <Link className="link-style" to="/search">
//       <li>Search</li>
//     </Link>
//     {!this.props.isAuthenticated ? (
//       <Link className="link-style" to="/login">
//         <li>Log in</li>
//       </Link>
//     ) : (
//       <Link className="link-style" to="/">
//         <li onClick={this.handleLogoutClick}>Log Out</li>
//       </Link>
//     )}
//   </ul>
// </nav>;
