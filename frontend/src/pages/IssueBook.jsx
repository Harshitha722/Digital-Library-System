import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

import "../assets/css/Books.css";

const IssueBook = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [dueDays, setDueDays] = useState(14);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      const booksRes = await API.get("/books");
      setBooks(booksRes.data.filter((book) => book.availableCopies > 0));

      if (user?.role === "admin" || user?.role === "librarian") {
        const usersRes = await API.get("/users");
        setUsers(usersRes.data.filter((item) => item.role !== "admin"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIssue = async (e) => {
    e.preventDefault();

    if (!selectedBook) {
      alert("Please choose a book to issue.");
      return;
    }

    if ((user?.role === "admin" || user?.role === "librarian") && !selectedUser) {
      alert("Please choose a borrower.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        bookId: selectedBook,
        dueDays
      };

      if (selectedUser) payload.userId = selectedUser;

      await API.post("/borrows/issue", payload);
      alert("Book issued successfully.");
      setSelectedBook("");
      setSelectedUser("");
      setDueDays(14);
      fetchData();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to issue book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="books-container">
          <div className="books-header">
            <h2>Issue Book</h2>
          </div>

          <form onSubmit={handleIssue}>
            <label>Book</label>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              required
            >
              <option value="">Select a book</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title} — {book.author} ({book.availableCopies} available)
                </option>
              ))}
            </select>

            {(user?.role === "admin" || user?.role === "librarian") && (
              <>
                <label>Borrower</label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  required
                >
                  <option value="">Select a borrower</option>
                  {users.map((borrower) => (
                    <option key={borrower._id} value={borrower._id}>
                      {borrower.name} — {borrower.email} ({borrower.role})
                    </option>
                  ))}
                </select>
              </>
            )}

            <label>Due Days</label>
            <input
              type="number"
              min="1"
              value={dueDays}
              onChange={(e) => setDueDays(Number(e.target.value))}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Issuing..." : "Issue Book"}
            </button>
          </form>

          <div style={{ marginTop: "20px" }}>
            <h3>Available Books</h3>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Available</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.availableCopies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueBook;
