import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../assets/css/Books.css";

const Books = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const res = await API.get("/books");

        setBooks(res.data);

      } catch (error) {

        console.error(
          "Error fetching books:",
          error
        );
      }
    };

    fetchBooks();

  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <div className="books-container">

          <h2>Books</h2>

          <table>

            <thead>

              <tr>

                <th>Title</th>

                <th>Author</th>

              </tr>

            </thead>

            <tbody>

              {books.map((book) => (

                <tr key={book._id}>

                  <td>{book.title}</td>

                  <td>{book.author}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </>
  );
};

export default Books;