import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import "../assets/css/Books.css";

const FineDashboard = () => {
  const [summary, setSummary] = useState([]);
  const [pendingFines, setPendingFines] = useState([]);
  const [totalPending, setTotalPending] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchFines = async () => {
    try {
      setLoading(true);
      const res = await API.get('/fines');
      setSummary(res.data);
      const pending = res.data.reduce((sum, item) => sum + item.totalFine, 0);
      setTotalPending(pending);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFines();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="books-container">
          <div className="books-header">
            <h2>Fine Dashboard</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <h3>Total Pending Fines</h3>
              <p style={{ fontSize: '1.6rem', fontWeight: '700', color: '#be123c' }}>${totalPending.toFixed(2)}</p>
            </div>
            <div>
              <button onClick={fetchFines} disabled={loading}>
                {loading ? 'Refreshing...' : 'Refresh Report'}
              </button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Records</th>
                <th>Total Fine</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((item) => (
                <tr key={item.userId}>
                  <td>{item.name || 'N/A'}</td>
                  <td>{item.email || 'N/A'}</td>
                  <td>{item.count}</td>
                  <td>${item.totalFine.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FineDashboard;
