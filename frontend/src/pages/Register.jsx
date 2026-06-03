import { useState }
from "react";

import { useNavigate, Link }
from "react-router-dom";

import API
from "../services/api";

import "../assets/css/Register.css";

const Register = () => {

  const navigate =
  useNavigate();

  const [form,setForm] =
  useState({
    name:"",
    email:"",
    password:""
  });

  const handleSubmit =
  async(e)=>{

    e.preventDefault();

    try{

      await API.post(
        "/auth/register",
        form
      );

      alert(
        "Registration Successful"
      );

      navigate("/login");

    }catch(error){

      console.log(error);

      alert(
        "Registration Failed"
      );
    }
  };

  return(

    <div className="register-page">

      <div className="register-card">

        <h2>
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Full Name"
            onChange={(e)=>
            setForm({
              ...form,
              name:e.target.value
            })}
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value
            })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>
            setForm({
              ...form,
              password:e.target.value
            })}
          />

          <button>
            Register
          </button>

        </form>

        <p
          className="login-redirect"
        >

          Already have
          an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;