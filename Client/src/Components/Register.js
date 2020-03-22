import React from "react";
import "./register.css";

const Register = () => {
  return (
    <div className="registration-page">
      <h1>Register</h1>
      <form className="registration-form">
        <label>email</label>
        <input></input>
        <label>password</label>
        <input></input>
        <label>username</label>
        <input></input>
        <label>location</label>
        <input></input>
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
