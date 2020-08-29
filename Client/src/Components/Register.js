import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import history from "../history";
import { Form, Button, Container } from "semantic-ui-react";

import "./register.css";

const Register = () => {
  const [usersEmail, setUsersEmail] = useState([]);
  const [userNames, setUserNames] = useState();
  const [emailMessage, setEmailMessage] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/users/list").then((response) => {
      const emails = response.data.map((item) => item.email);
      const usernames = response.data.map((item) => item.username);
      setUsersEmail(emails);
      setUserNames(usernames);
    });
  }, []);

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = async () => {
    if (usersEmail.includes(email)) {
      setEmailMessage("That email address has already been used to register");
    }
    if (userNames.includes(username)) {
      setUserNameMessage("That username is already in use");
    } else {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        location: location,
      };
      await axios
        .post("http://localhost:8080/api/register/new", user)
        .then((response) => {
          history.push("/login");
        });
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <Container>
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
    </Container>

    // <div className="registration-page">

    // </div>
  );
};

export default Register;
