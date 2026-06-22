import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../assets/css/Books.css";

const Books = () => {

  const [books, setBooks] =
  useState([]);

  const [search, setSearch] =
  useState("");

  const [categories, setCategories] =
  useState([]);

  const [selectedCategory,
    setSelectedCategory] =
  useState("");

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  const borrowBook = async (bookId) => {
    if (!user) {
      alert('Please login to borrow books');
      return;
    }

    try {
      await API.post('/borrows/issue', { bookId, dueDays: 14 });
      alert('Book issued successfully');
      await refreshBooks();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to issue book');
    }
  };

  const refreshBooks = async () => {

    try {

      const res =
      await API.get("/books");

      setBooks(res.data);

    } catch (error) {

      console.error(
        "Error fetching books:",
        error
      );
    }
  };

  useEffect(() => {

    const initializeData =
    async () => {

      try {

        const booksRes =
        await API.get(
          "/books"
        );

        setBooks(
          booksRes.data
        );

        const categoriesRes =
        await API.get(
          "/categories"
        );

        setCategories(
          categoriesRes.data
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };

    initializeData();

  }, []);

  const deleteBook =
  async (id) => {

    const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await API.delete(
        `/books/${id}`
      );

      alert(
        "Book Deleted Successfully"
      );

      await refreshBooks();

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Delete Book"
      );
    }
  };

  const filteredBooks =
  books.filter((book) => {

    const matchesSearch =
    book.title
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      );

    const matchesCategory =

      selectedCategory === ""

      ||

      book.category?._id ===
      selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );

  });

  return (

    <>
      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <div className="books-container">

          <div className="books-header">

            <h2>
              Books
            </h2>

            <div className="books-actions">

              <input
                type="text"
                placeholder="Search Books..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="search-box"
              />

              <select
                value={
                  selectedCategory
                }
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value
                  )
                }
                className="category-filter"
              >

                <option value="">
                  All Categories
                </option>

                {
                  categories.map(
                    (category) => (

                      <option
                          key={category._id}
                          value={category._id}
                        >
                          {category.categoryName}
                        </option>
                                    )
                  )
                }

              </select>

              {
                (
                  user?.role === "admin" ||
                  user?.role === "librarian"
                ) && (

                  <Link
                    to="/add-book"
                    className="add-book-btn"
                  >
                    Add Book
                  </Link>

                )
              }

            </div>

          </div>

          <table>

            <thead>

              <tr>

                <th>
                  Title
                </th>

                <th>
                  Author
                </th>

                <th>
                  ISBN
                </th>

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
  filteredBooks.length > 0 ?

  filteredBooks.map(
    (book) => (

      <tr
        key={book._id}
      >

        <td>
          <Link
            to={`/books/${book._id}`}
          >
            {book.title}
          </Link>
        </td>

        <td>
          {book.author}
        </td>

        <td>
          {book.isbn}
        </td>

        <td>
          {
            book.category?.categoryName
            || "N/A"
          }
        </td>

        <td>

          {
            (
              user?.role === "admin" ||
              user?.role === "librarian"
            ) && (
              <>
                <Link
                  to={`/edit-book/${book._id}`}
                  className="edit-btn"
                >
                  Edit
                </Link>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteBook(
                      book._id
                    )
                  }
                >
                  Delete
                </button>
              </>
            )
          }

          {
            (user?.role === 'student' || user?.role === 'teacher') && book.availableCopies > 0 && (
              <button className="borrow-btn" onClick={() => borrowBook(book._id)}>Borrow</button>
            )
          }

        </td>

      </tr>

    )
  )

  :

  <tr>

    <td
      colSpan="5"
      className="no-books"
    >
      No Books Found
    </td>

  </tr>

}

</tbody>

          </table>

        </div>

      </div>

    </>
  );
};

export default Books;