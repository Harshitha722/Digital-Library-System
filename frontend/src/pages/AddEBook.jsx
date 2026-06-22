import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../assets/css/AddBook.css";

const AddEBook = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    category: ""
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      formData.append("pdfFile", file);

      await API.post("/ebooks", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("E-Book uploaded successfully");
      navigate("/ebooks");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to upload e-book");
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />

        <div className="add-book-container">
          <h2>Upload E-Book</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="E-Book Title"
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
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />

            <button>Upload E-Book</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEBook;
