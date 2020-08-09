import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { connect } from "react-redux";
import history from "../history";
import { setAuthenticationHeader } from "../utilities/authenticate";
import "./login.css";

const Login = () => {
  const [userNames, setUserNames] = useState();
  const [passWords, setPassWords] = useState();
  const [userNameMessage, setUserNameMessage] = useState("");
  const [passwordMessage, setPasswordMessge] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/users/list").then((response) => {
      const usernames = response.data.map((item) => item.username);
      const passwords = response.data.map((item) => item.password);
      setUserNames(usernames);
      setPassWords(passwords);
    });
  }, []);

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(data.username);
    if (!userNames.includes(data.username)) {
      setUserNameMessage("I'm sorry, that username doesn't exist");
    }
    if (!passWords.includes(data.password)) {
      setPasswordMessge("I'm sorry, that password is incorrect");
    } else {
      axios
        .post("http://localhost:8080/api/login/user", {
          username: data.username,
          password: data.password,
        })
        .then((response) => {
          console.log(response);
          let token = response.data.token;
          let userID = response.data.id;
          localStorage.setItem("jsonwebtoken", token);
          this.props.onAuthenticated(token, userID);
          setAuthenticationHeader(token);
          history.push("/profile");
        })
        .catch((err) => console.log(err));
    }
  };

  // add this in the promise after logging in
  // setAuthenticationHeader(token)

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="input-section">
          <label className="login-label">User Name</label>
          <input
            className="login-input"
            name="username"
            ref={register({ required: true })}
          />
          {errors.username && <p className="validation-error">Required</p>}
          <p className="validation-error">{userNameMessage}</p>
        </div>
        <div className="input-section">
          <label className="login-label">Password</label>
          <input
            className="login-input"
            name="password"
            type="password"
            ref={register({ required: true })}
          />
          {errors.password && <p className="validation-error">Required</p>}
          {errors.password && <p className="validation-error">Required</p>}
          <p className="validation-error">{passwordMessage}</p>
        </div>
        <button>Log In</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticated: (token, userID) =>
      dispatch({ type: "ON_AUTHENTICATED", token: token, uid: userID }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
