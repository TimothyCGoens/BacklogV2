import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <form className="login-form">
        <div className="input-section">
          <label className='login-label'>password</label>
          <input className='login-input' />
        </div>
        <div className="input-section">

          <label className='login-label'>username</label>
          <input className='login-input' />
        </div>
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
