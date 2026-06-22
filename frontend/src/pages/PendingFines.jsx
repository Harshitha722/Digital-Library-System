import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "../assets/css/Books.css";

const PendingFines = () => {
  const [pendingFines, setPendingFines] = useState([]);
  const [totalPending, setTotalPending] = useState(0);

  const fetchPending = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const path = user?.role === 'admin' || user?.role === 'librarian' ? '/fines' : `/fines/user/${user._id}`;
      const res = await API.get(path);
      setPendingFines(res.data.filter((item) => item.status === 'pending'));
      setTotalPending(res.data.filter((item) => item.status === 'pending').reduce((sum, item) => sum + item.amount, 0));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="books-container">
          <div className="books-header">
            <h2>Pending Fines</h2>
          </div>
          <p style={{ marginBottom: '12px' }}>Total pending fines: <strong>${totalPending.toFixed(2)}</strong></p>
          <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>Borrower</th>
                <th>Overdue Days</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingFines.map((fine) => (
                <tr key={fine._id} className={fine.overdueDays > 0 ? 'overdue-row' : ''}>
                  <td>{fine.borrow?.book?.title || 'N/A'}</td>
                  <td>{fine.borrow?.user?.name || fine.borrow?.user?.email || 'N/A'}</td>
                  <td>{fine.overdueDays}</td>
                  <td>${fine.amount.toFixed(2)}</td>
                  <td>{fine.status}</td>
                  <td>
                    <Link to={`/fine-payment/${fine._id}`}>
                      <button>Pay</button>
                    </Link>
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

export default PendingFines;
