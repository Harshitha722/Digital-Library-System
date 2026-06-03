import { useState } from "react";

import { useNavigate, Link }
from "react-router-dom";

import API
from "../services/api";

import "../assets/css/Register.css";

const Register = () => {

  const navigate =
  useNavigate();

  const [form, setForm] =
  useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        form
      );

      alert(
        "Registration Successful"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (

    <div className="register-page">

      <div className="register-card">

        <h2>
          Create Account
        </h2>

        <p className="register-subtitle">
          Register as Student or Teacher
        </p>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
            required
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value
              })
            }
          >

            <option value="student">
              Student
            </option>

            <option value="teacher">
              Teacher
            </option>

          </select>

          <button
            type="submit"
          >
            Register
          </button>

        </form>

        <p
          className="login-redirect"
        >

          Already have an account?

          {" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;