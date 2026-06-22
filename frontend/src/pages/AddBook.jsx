import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../assets/css/AddBook.css";

const AddBook = () => {

  const [categories,
  setCategories] =
  useState([]);

  const [form,setForm] =
  useState({

    title:"",
    author:"",
    isbn:"",
    publisher:"",
    description:"",
    category:"",
    totalCopies:1,
    availableCopies:1

  });
  const [file, setFile] = useState(null);

  useEffect(()=>{

    const fetchCategories =
    async()=>{

      try{

        const res =
        await API.get(
          "/categories"
        );

        setCategories(
          res.data
        );

      }catch(error){

        console.error(error);

      }

    };

    fetchCategories();

  },[]);

  const handleChange =
  (e)=>{

    setForm({

      ...form,

      [e.target.name]:
      e.target.value

    });

  };

  const handleSubmit =
  async(e)=>{

    e.preventDefault();

    try{

      const formData = new FormData();

      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });

      if (file) {
        formData.append('cover', file);
      }

      await API.post(
        "/books",
        formData
      );

      alert(
        "Book Added Successfully"
      );

      setForm({

        title:"",
        author:"",
        isbn:"",
        publisher:"",
        description:"",
        category:"",
        totalCopies:1,
        availableCopies:1

      });
      setFile(null);

    }
    catch(error){

      console.error(error);

      alert(
        "Failed To Add Book"
      );
    }
  };

  return(

    <>
      <Navbar/>

      <div className="dashboard-layout">

        <Sidebar/>

        <div className="add-book-container">

          <h2>
            Add Book
          </h2>

          <form
          onSubmit={handleSubmit}
          >

            <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={form.title}
            onChange={handleChange}
            required
            />

            <input
            type="text"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
            />

            <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={form.isbn}
            onChange={handleChange}
            required
            />

            <input
            type="text"
            name="publisher"
            placeholder="Publisher"
            value={form.publisher}
            onChange={handleChange}
            />

            <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            />

            <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            >

              <option value="">
                Select Category
              </option>

              {
                categories.map(
                  (cat)=>(

                    <option
                    key={cat._id}
                    value={cat._id}
                    >
                      {cat.categoryName}
                    </option>

                  )
                )
              }

            </select>

            <input
            type="number"
            name="totalCopies"
            placeholder="Total Copies"
            value={form.totalCopies}
            onChange={handleChange}
            />

            <input
            type="number"
            name="availableCopies"
            placeholder="Available Copies"
            value={form.availableCopies}
            onChange={handleChange}
            />

            <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={(e)=> setFile(e.target.files[0])}
            />

            <button>
              Add Book
            </button>

          </form>

        </div>

      </div>

    </>
  );
};

export default AddBook;