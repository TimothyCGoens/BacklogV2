import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import history from "../history";

import "./register.css";

const Register = () => {
  const [usersEmail, setUsersEmail] = useState([]);
  const [userNames, setUserNames] = useState();
  const [emailMessage, setEmailMessage] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/users/list").then((response) => {
      const emails = response.data.map((item) => item.email);
      const usernames = response.data.map((item) => item.username);
      setUsersEmail(emails);
      setUserNames(usernames);
    });
  }, []);

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    if (usersEmail.includes(data.email)) {
      setEmailMessage("This email is already in use.");
    }
    if (userNames.includes(data.username)) {
      setUserNameMessage("This username has already been chosen");
    } else {
      const user = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
        location: data.location,
      };
      await axios
        .post("http://localhost:8080/api/register/new", user)
        .then((response) => {
          history.push("/login");
        });
    }
  };

  return (
    <div className="registration-page">
      <h1>Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-section">
          <label className="register-label">First Name</label>
          <input
            className="registration-input"
            autoComplete="off"
            name="firstName"
            ref={register({ required: true })}
            type="text"
          />
          {errors.firstName && <p className="validation-error">Required</p>}
        </div>
        <div className="input-section">
          <label className="register-label">Last Name</label>
          <input
            className="registration-input"
            autoComplete="off"
            name="lastName"
            ref={register({ required: true })}
            type="text"
          />
          {errors.lastName && <p className="validation-error">Required</p>}
        </div>
        <div className="input-section">
          <label className="register-label">Email</label>
          <input
            className="registration-input"
            autoComplete="off"
            name="email"
            ref={register({ required: true })}
            type="text"
          />
          {errors.email && <p className="validation-error">Required</p>}
          <p className="validation-error">{emailMessage}</p>
        </div>
        <div className="input-section">
          <label className="register-label">Username</label>
          <input
            className="registration-input"
            autoComplete="off"
            name="username"
            ref={register({ required: true })}
            type="text"
          />
          {errors.username && <p className="validation-error">Required</p>}
          <p className="validation-error">{userNameMessage}</p>
        </div>
        <div className="input-section">
          <label className="register-label">Password</label>
          <input
            className="registration-input"
            autoComplete="off"
            name="password"
            ref={register({ required: true })}
            type="password"
          />
          {errors.password && <p className="validation-error">Required</p>}
        </div>
        <div className="input-section">
          <label className="register-label">Location</label>
          <input
            className="registration-input"
            autoComplete="off"
            name="location"
            ref={register({ required: true })}
            type="text"
          />
          {errors.Password && <p className="validation-error">Required</p>}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
