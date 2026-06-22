import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../assets/css/EBooks.css";

const EBooks = () => {
  const [ebooks, setEbooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      const [ebooksRes, categoriesRes] = await Promise.all([
        API.get("/ebooks"),
        API.get("/categories")
      ]);

      setEbooks(ebooksRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error("Error fetching ebooks:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteEBook = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this e-book?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/ebooks/${id}`);
      await fetchData();
      alert("E-Book deleted successfully");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete e-book");
    }
  };

  const downloadEBook = async (id, title) => {
    try {
      const response = await API.get(`/ebooks/download/${id}`, {
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to download e-book");
    }
  };

  const filteredEBooks = ebooks.filter((ebook) => {
    const matchesSearch =
      ebook.title?.toLowerCase().includes(search.toLowerCase()) ||
      ebook.author?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      ebook.category?._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="ebooks-container">
          <div className="ebooks-header">
            <h2>E-Books</h2>

            <div className="ebooks-actions">
              <input
                type="text"
                placeholder="Search e-books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-box"
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-filter"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>

              {(user?.role === "admin" || user?.role === "librarian") && (
                <Link to="/add-ebook" className="add-ebook-btn">
                  Upload E-Book
                </Link>
              )}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Uploaded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEBooks.length > 0 ? (
                filteredEBooks.map((ebook) => (
                  <tr key={ebook._id}>
                    <td>
                      <Link to={`/ebooks/${ebook._id}`}>{ebook.title}</Link>
                    </td>
                    <td>{ebook.author}</td>
                    <td>{ebook.category?.categoryName || "N/A"}</td>
                    <td>{ebook.uploadedBy?.name || ebook.uploadedBy?.email}</td>
                    <td>
                      <button
                      className="download-btn"
                      onClick={() => downloadEBook(ebook._id, ebook.title)}
                    >
                      Download
                    </button>
                    {(user?.role === "admin" || user?.role === "librarian") && (
                      <button
                        className="delete-btn"
                        onClick={() => deleteEBook(ebook._id)}
                      >
                        Delete
                      </button>
                    )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-ebooks">
                    No e-books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EBooks;
