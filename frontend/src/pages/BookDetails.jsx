import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../assets/css/BookDetails.css";

const BookDetails = () => {

  const { id } =
  useParams();

  const [book, setBook] =
  useState(null);

  useEffect(() => {

    const fetchBook =
    async () => {

      try {

        const res =
        await API.get(
          `/books/${id}`
        );

        setBook(
          res.data
        );

      } catch (error) {

        console.error(
          "Error fetching book:",
          error
        );

      }

    };

    fetchBook();

  }, [id]);

  if (!book) {

    return <h2>Loading...</h2>;

  }

  return (

    <>
      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <div className="book-details">

          <h2>
            {book.title}
          </h2>

          <p>

            <strong>
              Author:
            </strong>{" "}

            {book.author}

          </p>

          <p>

            <strong>
              ISBN:
            </strong>{" "}

            {book.isbn}

          </p>

          <p>

            <strong>
              Category:
            </strong>{" "}

            {
              book.category
              ?.categoryName
              || "N/A"
            }

          </p>

          <p>

            <strong>
              Publisher:
            </strong>{" "}

            {book.publisher
            || "N/A"}

          </p>

          <p>

            <strong>
              Description:
            </strong>{" "}

            {book.description
            || "N/A"}

          </p>

          <p>

            <strong>
              Available Copies:
            </strong>{" "}

            {
              book.availableCopies
            }

          </p>

          {
            book.coverImage && (

              <img
                src={
                  `http://localhost:5000/${book.coverImage}`
                }
                alt={
                  book.title
                }
                className="book-cover"
              />

            )
          }

        </div>

      </div>

    </>
  );
};

export default BookDetails;