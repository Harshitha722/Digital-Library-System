import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../assets/css/EditBook.css";

const EditBook = () => {

  const { id } =
  useParams();

  const navigate =
  useNavigate();

  const [form, setForm] =
  useState({

    title:"",
    author:"",
    isbn:"",
    publisher:"",
    description:"",
    totalCopies:1,
    availableCopies:1

  });

  useEffect(() => {

    const loadBook =
    async () => {

      const res =
      await API.get(
        `/books/${id}`
      );

      setForm(res.data);
    };

    loadBook();

  }, [id]);

  const handleChange =
  (e) => {

    setForm({

      ...form,

      [e.target.name]:
      e.target.value

    });

  };

  const handleSubmit =
  async(e)=>{

    e.preventDefault();

    await API.put(
      `/books/${id}`,
      form
    );

    alert(
      "Book Updated"
    );

    navigate("/books");

  };

  return(

    <>
      <Navbar/>

      <div className="dashboard-layout">

        <Sidebar/>

        <div className="edit-book-container">

          <h2>
            Edit Book
          </h2>

          <form
          onSubmit={handleSubmit}
          >

            <input
            name="title"
            value={form.title}
            onChange={handleChange}
            />

            <input
            name="author"
            value={form.author}
            onChange={handleChange}
            />

            <input
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            />

            <button>
              Update Book
            </button>

          </form>

        </div>

      </div>

    </>
  );
};

export default EditBook;