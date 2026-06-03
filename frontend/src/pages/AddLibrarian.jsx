import { useState }
from "react";

import API
from "../services/api";

import Navbar
from "../components/Navbar";

import Sidebar
from "../components/Sidebar";

import "../assets/css/AddLibrarian.css";

const AddLibrarian = () => {

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
    "/users/librarian",
    form
   );

   alert(
    "Librarian Created"
   );

   setForm({

    name:"",
    email:"",
    password:""

   });

  }catch(error){

   alert(
    error.response?.data?.message
   );
  }
 };

 return(

 <>
 <Navbar/>

 <div className=
 "dashboard-layout">

 <Sidebar/>

 <div className=
 "add-librarian-container">

 <h2>
 Add Librarian
 </h2>

 <form
 onSubmit={handleSubmit}
 >

 <input
 type="text"
 placeholder="Name"
 value={form.name}
 onChange={(e)=>
 setForm({
  ...form,
  name:e.target.value
 })
 }
 />

 <input
 type="email"
 placeholder="Email"
 value={form.email}
 onChange={(e)=>
 setForm({
  ...form,
  email:e.target.value
 })
 }
 />

 <input
 type="password"
 placeholder="Password"
 value={form.password}
 onChange={(e)=>
 setForm({
  ...form,
  password:e.target.value
 })
 }
 />

 <button>
 Create Librarian
 </button>

 </form>

 </div>

 </div>

 </>
 );
};

export default AddLibrarian;