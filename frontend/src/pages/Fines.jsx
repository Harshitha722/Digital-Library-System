import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import API from "../services/api";

const Fines = () => {
  const [report, setReport] = useState([]);

  const fetchReport = async () => {
    try {
      const res = await API.get('/borrows/fines');
      setReport(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="books-container">
          <h2>Fines Report</h2>

          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Records With Fines</th>
                <th>Total Fine</th>
              </tr>
            </thead>

            <tbody>
              {report.map(r => (
                <tr key={r.userId}>
                  <td>{r.name || 'N/A'}</td>
                  <td>{r.email || 'N/A'}</td>
                  <td>{r.count}</td>
                  <td>{r.totalFine}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
};

export default Fines;
