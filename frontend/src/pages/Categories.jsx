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

              </tr>

            </thead>

            <tbody>

              {
                categories.map(
                  (category) => (

                    <tr
                      key={category._id}
                    >

                      <td>
                        {
                          category.categoryName
                        }
                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </>
  );
};

export default Categories;