// Required Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import img1 from "../img/more-leaves.png";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes.js";

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function Register() {
  // Hooks
  const [values, setValues] = useState({
    username: " ",
    email: " ",
    password: " ",
    confirmPassword: " ",
  });

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Navigator
  const navigate = useNavigate();

  // Handling change
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Validating form
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error(
        "Password and Confirm Password should be same.",
        toastOptions
      );
      return false;
    } else if (email === " ") {
      toast.error("Email should not be empty", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should have atleast 4 characters", toastOptions);
      return false;
    }
    return true;
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Toast Options
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    hideProgressBar: true,
  };

  // Submit functionality
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await Axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        navigate("/chat");
      }
    }
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="heading">
            <h1>Gossip</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => handleChange(e)}
          ></input>
          <button type="submit">Register</button>

          <span>
            Already a user ?{" "}
            <Link className="login" to="/login">
              Login
            </Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// CSS Styling
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  background: url(${img1});

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 152, 0);
    gap: 1.5rem;
    padding: 3rem 5rem;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .heading h1 {
    background-color: rgb(255, 152, 0);
    color: #ffff;
    font-size: 3rem;
  }

  input {
    background: transparent;
    padding: 10px;
    border-radius: 23px;
    border: solid 2px white;
    outline-color: rgb(217, 237, 191);
    width: 100%;
    font-size: 1.2rem;
  }
  input::placeholder {
    color: white;
  }

  input:focus {
    background-color: #ffff;
  }
  button {
    background: transparent;
    padding: 10px;
    border-radius: 23px;
    width: 100%;
    border: solid 2px white;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
  button:hover {
    background-color: #ffff;
    cursor: pointer;
    transition: 0.4s ease-in-out;
  }
  span {
    background: transparent;
    font-size: 1.2rem;
  }
  .login {
    background: transparent;
    text-decoration: none;
    color: white;
  }
  .login:hover {
    text-decoration: underline;
  }
`;

export default Register;
