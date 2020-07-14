import React from "react";
import { useForm } from "react-hook-form";
import "./register.css";

const Register = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="registration-page">
      <h1>Register</h1>
      <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-section">
          <label>First Name</label>
          <input
            name="firstName"
            ref={register({ required: true })}
            type="text"
          />
          {errors.firstName && <p>Required</p>}
        </div>

        <div className="input-section">
          <label>Last Name</label>
          <input
            name="lastName"
            ref={register({ required: true })}
            type="text"
          />
          {errors.lastName && <p>Required</p>}
        </div>
        <div className="input-section">
          <label>Email</label>
          <input name="email" ref={register({ required: true })} type="text" />
          {errors.email && <p>Required</p>}
        </div>

        <div className="input-section">
          <label>Username</label>

          <input
            name="username"
            ref={register({ required: true })}
            type="text"
          />
          {errors.username && <p>Required</p>}
        </div>

        <div className="input-section">
          <label>Password</label>
          <input
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
            name="location"
            ref={register({ required: true })}
            type="text"
          />
          {errors.location && <p>Required</p>}
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
