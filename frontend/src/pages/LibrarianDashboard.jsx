import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

import API from "../services/api";

import "../assets/css/Dashboard.css";

const Dashboard = () => {

  const [stats, setStats] =
  useState({});

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res =
        await API.get(
          "/dashboard/stats"
        );

        setStats(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

    fetchStats();

  }, []);

  return (

    <>
      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <div className="dashboard-content">

          <h1>
            Dashboard
          </h1>

          <div className="stats-grid">

            <StatCard
              title="Books"
              value={stats.totalBooks || 0}
            />

            <StatCard
              title="Students"
              value={stats.totalStudents || 0}
            />

            <StatCard
              title="Teachers"
              value={stats.totalTeachers || 0}
            />

            <StatCard
              title="Categories"
              value={stats.totalCategories || 0}
            />

            <StatCard
              title="Issued Books"
              value={stats.issuedBooks || 0}
            />

          </div>

        </div>

      </div>

    </>
  );
};

export default Dashboard;