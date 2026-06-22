import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import API from "../services/api";

const BorrowHistory = () => {

    const [records, setRecords] = useState([]);
    const [allRecords, setAllRecords] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');

    const user = JSON.parse(localStorage.getItem('user'));

    const fetchRecords = async () => {
        try {
            let res;
            if (user?.role === 'student' || user?.role === 'teacher') {
                res = await API.get(`/borrows/history/${user._id}`);
            } else {
                res = await API.get('/borrows');
            }
            setAllRecords(res.data);
            setRecords(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    useEffect(() => {
        const filtered = statusFilter === 'all'
            ? allRecords
            : allRecords.filter(rec => rec.status === statusFilter);
        setRecords(filtered);
    }, [statusFilter, allRecords]);

    const returnRecord = async (id) => {
        const confirmReturn = window.confirm('Mark this book as returned?');
        if (!confirmReturn) return;
        try {
            await API.put(`/borrows/return/${id}`);
            fetchRecords();
            alert('Book returned');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to return book');
        }
    };

    return (

        <>
            <Navbar />

            <div className="dashboard-layout">

                <Sidebar />

                <div className="books-container">

                    <div className="books-header">
                        <h2>Borrow History</h2>
                        <div className="status-tabs">
                            {['all', 'active', 'overdue', 'returned'].map((status) => {
                                const label = status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1);
                                const count = status === 'all'
                                    ? allRecords.length
                                    : allRecords.filter(rec => rec.status === status).length;
                                return (
                                    <button
                                        key={status}
                                        type="button"
                                        className={statusFilter === status ? 'tab active' : 'tab'}
                                        onClick={() => setStatusFilter(status)}
                                    >
                                        {label} <span className="tab-count">{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <table>

                        <thead>

                            <tr>
                                <th>Book</th>
                                <th>User</th>
                                <th>Issue Date</th>
                                <th>Due Date</th>
                                <th>Return Date</th>
                                <th>Status</th>
                                <th>Fine</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {records.map(rec => {
                                const isOverdue = rec.status === 'overdue';
                                return (
                                    <tr key={rec._id} className={isOverdue ? 'overdue-row' : ''}>
                                        <td>{rec.bookId?.title || 'N/A'}</td>
                                        <td>{rec.userId?.name || rec.userId?.email || 'N/A'}</td>
                                        <td>{new Date(rec.issueDate).toLocaleDateString()}</td>
                                        <td>{rec.dueDate ? new Date(rec.dueDate).toLocaleDateString() : 'N/A'}</td>
                                        <td>{rec.returnDate ? new Date(rec.returnDate).toLocaleDateString() : '—'}</td>
                                        <td>
                                            <span className={`status-badge ${rec.status}`}>
                                                {rec.status}
                                            </span>
                                        </td>
                                        <td>{rec.fine || 0}</td>
                                        <td>
                                            {rec.status === 'active' && (user?._id === rec.userId?._id || user?.role === 'librarian' || user?.role === 'admin') && (
                                                <button onClick={() => returnRecord(rec._id)}>Return</button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>

                    </table>

                </div>

            </div>
        </>
    );
};

export default BorrowHistory;