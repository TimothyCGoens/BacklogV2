import React, { Component } from "react";
import axios from "axios";
import history from "../history";
import { connect } from "react-redux";
import { setAuthenticationHeader } from "../utilities/authenticate";
import { Button, Container, Input } from "semantic-ui-react";

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
      errorMessage: "",
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

    axios
      .post("http://localhost:8080/api/login/newuser", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message) {
          this.setState({
            errorMessage: response.data.message,
          });
        } else {
          let token = response.data.token;
          let userId = response.data.id;
          localStorage.setItem("jsonwebtoken", token);
          this.props.onAuthenticated(token, userId);
          setAuthenticationHeader(token);
          history.push(`/profile/${userId}`);
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container>
        <h1>Login</h1>
        <form onSubmit={this.onFormSubmit}>
          <div className="register-input-section">
            <label className="login-label">User Name</label>
            <Input
              value={this.state.username}
              onChange={this.onUsernameInputChange}
              className="login-input"
              name="username"
              autoComplete="off"
              type="text"
            />
          </div>
          <div className="register-input-section">
            <label className="login-label">Password</label>
            <Input
              value={this.state.password}
              onChange={this.onPasswordInputChange}
              className="login-input"
              name="password"
              autoComplete="off"
              type="password"
            />
            <p className="validation-error">{this.state.errorMessage}</p>
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
