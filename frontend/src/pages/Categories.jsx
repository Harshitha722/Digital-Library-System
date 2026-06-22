import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import API from "../services/api";

import "../assets/css/Categories.css";

const Categories = () => {

  const [categories, setCategories] =
  useState([]);

  const [categoryName,
  setCategoryName] =
  useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const res =
        await API.get(
          "/categories"
        );

        setCategories(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

    fetchCategories();

  }, []);

  const addCategory =
  async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/categories",
        {
          categoryName
        }
      );

      setCategoryName("");

      const res =
      await API.get(
        "/categories"
      );

      setCategories(
        res.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  const startEdit = (category) => {
    setEditingId(category._id);
    setEditingName(category.categoryName);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/categories/${id}`, { categoryName: editingName });
      const res = await API.get(`/categories`);
      setCategories(res.data);
      cancelEdit();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategoryById = async (id) => {
    const confirmDelete = window.confirm('Delete this category?');
    if (!confirmDelete) return;
    try {
      await API.delete(`/categories/${id}`);
      const res = await API.get(`/categories`);
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <>
      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <div className="categories-container">

          <h2>
            Categories
          </h2>

          <form
            onSubmit={addCategory}
            className="category-form"
          >

            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) =>
                setCategoryName(
                  e.target.value
                )
              }
            />

            <button type="submit">
              Add
            </button>

          </form>

          <table>

            <thead>

              <tr>

                <th>
                  Category
                </th>
                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {
                categories.map((category) => (

                  <tr key={category._id}>

                    <td>
                      {editingId === category._id ? (
                        <input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                        />
                      ) : (
                        category.categoryName
                      )}
                    </td>

                    <td>
                      {editingId === category._id ? null : (
                        (user?.role === 'admin' || user?.role === 'librarian') && (
                          <>
                            <button onClick={() => startEdit(category)}>Edit</button>
                            <button onClick={() => deleteCategoryById(category._id)}>Delete</button>
                          </>
                        )
                      )}

                      {editingId === category._id && (
                        <>
                          <button onClick={() => saveEdit(category._id)}>Save</button>
                          <button onClick={cancelEdit}>Cancel</button>
                        </>
                      )}

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </>
  );
};

export default Categories;