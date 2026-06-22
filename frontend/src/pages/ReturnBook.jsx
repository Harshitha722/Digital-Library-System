import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

import "../assets/css/Books.css";

const ReturnBook = () => {
  const [records, setRecords] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchRecords = async () => {
    try {
      const params = { status: 'active' };
      if (user?.role === 'student' || user?.role === 'teacher') {
        params.userId = user._id;
      }
      const res = await API.get('/borrows', { params });
      setRecords(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleReturn = async (id) => {
    const confirmed = window.confirm('Confirm return for this book?');
    if (!confirmed) return;
    setLoadingId(id);

    try {
      await API.put(`/borrows/return/${id}`);
      alert('Book return recorded.');
      fetchRecords();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Return failed.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="books-container">
          <div className="books-header">
            <h2>Return Book</h2>
          </div>

          <p>Only active borrow records can be returned.</p>

          <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>Borrower</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id} className={record.status === 'overdue' ? 'overdue-row' : ''}>
                  <td>{record.bookId?.title || 'N/A'}</td>
                  <td>{record.userId?.name || record.userId?.email || 'N/A'}</td>
                  <td>{record.dueDate ? new Date(record.dueDate).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${record.status}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    {((user?.role === 'librarian' || user?.role === 'admin') || String(user?._id) === String(record.userId?._id)) ? (
                      <button
                        onClick={() => handleReturn(record._id)}
                        disabled={loadingId === record._id}
                      >
                        {loadingId === record._id ? 'Returning...' : 'Return'}
                      </button>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReturnBook;
