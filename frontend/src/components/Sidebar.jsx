import { Link } from "react-router-dom";

import "../assets/css/Sidebar.css";

const Sidebar = () => {

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="sidebar">

      <h2 className="sidebar-title">
        Library
      </h2>

      {/* ADMIN */}

      {
        user?.role === "admin" && (
          <>
            <Link to="/admin-dashboard">
              Dashboard
            </Link>

            <Link to="/books">
              Books
            </Link>

            <Link to="/ebooks">
              E-Books
            </Link>

            <Link to="/categories">
              Categories
            </Link>

            <Link to="/users">
              Users
            </Link>

            <Link to="/add-librarian">
              Add Librarian
            </Link>

            <Link to="/issue-book">
              Issue Book
            </Link>

            <Link to="/return-book">
              Return Book
            </Link>

            <Link to="/borrow-history">
              Borrow History
            </Link>
            <Link to="/fines">
              Fines
            </Link>

            <Link to="/add-book">
              Add Book
            </Link>

            <Link to="/add-ebook">
              Upload E-Book
            </Link>
          </>
        )
      }

      {/* LIBRARIAN */}

      {
        user?.role === "librarian" && (
          <>
            <Link to="/librarian-dashboard">
              Dashboard
            </Link>

            <Link to="/books">
              Books
            </Link>

            <Link to="/ebooks">
              E-Books
            </Link>

            <Link to="/categories">
              Categories
            </Link>

            <Link to="/issue-book">
              Issue Book
            </Link>

            <Link to="/return-book">
              Return Book
            </Link>

            <Link to="/borrow-history">
              Borrow History
            </Link>
            <Link to="/fines">
              Fines
            </Link>

            <Link to="/add-ebook">
              Upload E-Book
            </Link>
          </>
        )
      }

      {/* TEACHER */}

      {
        user?.role === "teacher" && (
          <>
            <Link to="/teacher-dashboard">
              Dashboard
            </Link>

            <Link to="/books">
              Books
            </Link>

            <Link to="/ebooks">
              E-Books
            </Link>

            <Link to="/borrow-history">
              Borrow History
            </Link>
          </>
        )
      }

      {/* STUDENT */}

      {
        user?.role === "student" && (
          <>
            <Link to="/student-dashboard">
              Dashboard
            </Link>

            <Link to="/books">
              Books
            </Link>

            <Link to="/ebooks">
              E-Books
            </Link>

            <Link to="/borrow-history">
              Borrow History
            </Link>
          </>
        )
      }

    </div>

  );
};

export default Sidebar;