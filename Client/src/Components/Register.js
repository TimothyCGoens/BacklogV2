import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [firstNameChoice, setFirstNameChoice] = useState();
  const [lastNameChoice, setLastNameChoice] = useState();
  const [emailChoice, setEmailChoice] = useState();
  const [usernameChoice, setUsernameChoice] = useState();
  const [passwordChoice, setPasswordChoice] = useState();
  const [locationChoice, setLocationChoice] = useState();
  const [usersEmail, setUsersEmail] = useState([]);
  const [message, setMessage] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstNameChoice(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastNameChoice(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailChoice(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsernameChoice(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordChoice(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocationChoice(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/register/users").then((response) => {
      const emails = response.data.map((item) => item.email);
      setUsersEmail(emails);
    });
  }, []);
  console.log(usersEmail);

  const { register, handleSubmit, watch, errors } = useForm();
  const handleRegisterClick = async () => {
    if (usersEmail.includes(emailChoice)) {
      setMessage("This email is already in use.");
    } else {
      const user = {
        firstName: firstNameChoice,
        lastName: lastNameChoice,
        email: emailChoice,
        username: usernameChoice,
        password: passwordChoice,
        location: locationChoice,
      };
      await axios
        .post("http://localhost:8080/api/register/new", user)
        .then((response) => {
          console.log(response);
        });
    }
  };

  return (
    <div className="registration-page">
      <h1>Register</h1>

      <div className="input-section">
        <label>First Name</label>
        <input
          onChange={handleFirstNameChange}
          name="firstName"
          ref={register({ required: true })}
          type="text"
        />
        {errors.firstName && <p>Required</p>}
      </div>

      <div className="input-section">
        <label>Last Name</label>
        <input
          onChange={handleLastNameChange}
          name="lastName"
          ref={register({ required: true })}
          type="text"
        />
        {errors.lastName && <p>Required</p>}
      </div>
      <div className="input-section">
        <label>Email</label>
        <input
          onChange={handleEmailChange}
          name="email"
          ref={register({ required: true })}
          type="text"
        />
        {errors.email && <p>Required</p>}
        <p>{message}</p>
      </div>

      <div className="input-section">
        <label>Username</label>

        <input
          onChange={handleUsernameChange}
          name="username"
          ref={register({ required: true })}
          type="text"
        />
        {errors.username && <p>Required</p>}
      </div>

      <div className="input-section">
        <label>Password</label>
        <input
          onChange={handlePasswordChange}
          name="password"
          ref={register({ required: true, minLength: 8 })}
          type="password"
        />
        {errors.password && errors.password.type === "required" && (
          <p>Required</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>Minimum 8 characters</p>
        )}
      </div>

      <div className="input-section">
        <label>Location</label>
        <input
          onChange={handleLocationChange}
          name="location"
          ref={register({ required: true })}
          type="text"
        />
        {errors.location && <p>Required</p>}
      </div>

      <button onClick={handleRegisterClick}>Register</button>
    </div>
  );
};

export default Register;
