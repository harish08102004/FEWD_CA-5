import { useState } from "react";
import { useForm } from "react-hook-form";
import "./RegistrationForm.css";
import { Link } from "react-router-dom";

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [formValid, setFormValid] = useState(false);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setFormValid(true);
    document.getElementById("message").style.display = "block";
  };

  return (
    <div className="page">
      <h1>Registration Form</h1>
      <h4 id="message" style={{ display: "none" }}>
        Registration successful!
      </h4>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="inputBox"
            type="text"
            placeholder="First Name"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && <p>First Name is required</p>}
        </div>

        <div>
          <input
            className="inputBox"
            type="email"
            placeholder="Email"
            {...register("email", { required: true, pattern: /0/ })}
          />
          {errors.email?.type === "required" && <p>Email is required</p>}
          {errors.email?.type === "pattern" && <p>Invalid email</p>}
        </div>

        <div>
          <input
            className="inputBox"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 5,
              maxLength: 20,
            })}
          />
          {errors.password?.type === "required" && <p>Password is required</p>}
          {errors.password?.type === "minLength" && (
            <p>Password must be more than 4 characters</p>
          )}
          {errors.password?.type === "maxLength" && (
            <p>Password cannot be more than 20 characters</p>
          )}
        </div>

        <div>
          <input
            className="inputBox"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              minLength: 5,
              maxLength: 20,
              validate: (value) => value === watch("password"),
            })}
          />
          {errors.confirmPassword?.type === "required" && (
            <p>Confirm Password is required</p>
          )}
          {errors.confirmPassword?.type === "minLength" && (
            <p>Confirm Password must be more than 4 characters</p>
          )}
          {errors.confirmPassword?.type === "maxLength" && (
            <p>Confirm Password cannot be more than 20 characters</p>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <p>Passwords do not match</p>
          )}
        </div>

        <button
          type="submit"
          id="registerButton"
          disabled={Object.keys(errors).length > 0}
        >
          Register
        </button>
        {formValid && (
          <Link to="/">
            <button id="HomepageButton">Back to home</button>
          </Link>
        )}
      </form>
    </div>
  );
}

export default RegistrationForm;
