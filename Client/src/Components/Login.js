import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <form className="login-form">
        <label>password</label>
        <input></input>
        <label>username</label>
        <input></input>
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
