import { useState, useContext } from "react";

import { useNavigate, Link }
from "react-router-dom";

import { AuthContext }
from "../context/AuthContext";

import API from "../services/api";

import "../assets/css/Login.css";

const Login = () => {

  const [email, setEmail] =
  useState("");

  const [password, setPassword] =
  useState("");

  const { login } =
  useContext(AuthContext);

  const navigate =
  useNavigate();

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const res =
      await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      login(res.data);

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert(
        "Invalid Credentials"
      );
    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-header">

          <h2>
            Digital Library
          </h2>

          <p>
            Sign in to access
            your account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e)=>
                setEmail(
                  e.target.value
                )
              }
              required
            />

          </div>

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e)=>
                setPassword(
                  e.target.value
                )
              }
              required
            />

          </div>

          <button
            className="login-btn"
          >
            Login
          </button>

        </form>

        <div className="register-link">

          <Link
            to="/register"
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;