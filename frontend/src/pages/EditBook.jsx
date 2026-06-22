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
  const [file, setFile] = useState(null);

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

    try {
      const formData = new FormData();

      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });

      if (file) formData.append('cover', file);

      await API.put(`/books/${id}`, formData);

      alert("Book Updated");

      navigate("/books");
    } catch (error) {
      console.error(error);
      alert("Failed to update book");
    }

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

            <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={(e)=> setFile(e.target.files[0])}
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