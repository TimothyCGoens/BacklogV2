import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import { connect } from "react-redux";
import { setAuthenticationHeader } from "../utilities/authenticate";
import { Button, Container } from "semantic-ui-react";

import "./login.css";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      usernameArray: [],
      passwordarray: [],
      usernameMessage: "",
      passwordMessage: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/api/users/list").then((response) => {
      const usernames = response.data.map((item) => item.username);
      const passwords = response.data.map((item) => item.password);
      this.setState({
        usernameArray: usernames,
        passwordArray: passwords,
      });
    });
  }
  onUsernameInputChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onPasswordInputChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    if (!this.state.usernameArray.includes(this.state.username)) {
      this.setState({
        usernameMessage: "Please enter a valid username",
      });
    }
    if (!this.state.passwordArray.includes(this.state.password)) {
      this.setState({
        passwordMessage: "Please enter a valid password",
      });
    } else {
      axios
        .post("http://localhost:8080/api/login/user", {
          username: this.state.username,
          password: this.state.password,
        })
        .then((response) => {
          let token = response.data.token;
          let userId = response.data.id;
          localStorage.setItem("jsonwebtoken", token);
          this.props.onAuthenticated(token, userId);
          setAuthenticationHeader(token);
          history.push(`/profile/${userId}`);
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <Container>
        <h1>Login</h1>
        <form onSubmit={this.onFormSubmit}>
          <div className="input-section">
            <label className="login-label">User Name</label>
            <input
              value={this.state.username}
              onChange={this.onUsernameInputChange}
              className="login-input"
              name="username"
              autoComplete="off"
              type="text"
            />
            <p className="validation-error">{this.state.usernameMessage}</p>
          </div>
          <div className="input-section">
            <label className="login-label">Password</label>
            <input
              value={this.state.password}
              onChange={this.onPasswordInputChange}
              className="login-input"
              name="password"
              autoComplete="off"
              type="password"
            />
            <p className="validation-error">{this.state.passwordMessage}</p>
          </div>
          <Button>Log In</Button>
        </form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticated: (token, userId) =>
      dispatch({ type: "LOG_IN", token: token, userId: userId }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
