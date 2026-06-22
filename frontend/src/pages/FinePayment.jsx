import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "../assets/css/Books.css";

const FinePayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fine, setFine] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFine = async () => {
    try {
      const res = await API.get(`/fines/${id}`);
      setFine(res.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to load fine details.');
      navigate('/fines');
    }
  };

  useEffect(() => {
    fetchFine();
  }, [id]);

  const payFine = async () => {
    try {
      setLoading(true);
      await API.put(`/fines/pay/${id}`);
      alert('Fine paid successfully');
      navigate('/fines');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Payment failed.');
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
            <h2>Fine Payment</h2>
          </div>
          {fine ? (
            <>
              <div style={{ marginBottom: '16px' }}>
                <p><strong>Borrowed Book:</strong> {fine.borrow?.book?.title || 'N/A'}</p>
                <p><strong>Borrower:</strong> {fine.borrow?.user?.name || fine.borrow?.user?.email || 'N/A'}</p>
                <p><strong>Issue Date:</strong> {new Date(fine.borrow?.issueDate).toLocaleDateString()}</p>
                <p><strong>Due Date:</strong> {new Date(fine.borrow?.dueDate).toLocaleDateString()}</p>
                <p><strong>Return Date:</strong> {fine.borrow?.returnDate ? new Date(fine.borrow.returnDate).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Overdue Days:</strong> {fine.overdueDays}</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <h3>Total Fine</h3>
                <p style={{ fontSize: '1.8rem', fontWeight: '700', color: '#be123c' }}>${fine.amount.toFixed(2)}</p>
              </div>
              <button onClick={payFine} disabled={loading || fine.status === 'paid'}>
                {fine.status === 'paid' ? 'Already Paid' : loading ? 'Processing...' : 'Pay Fine'}
              </button>
            </>
          ) : (
            <p>Loading fine details...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FinePayment;
