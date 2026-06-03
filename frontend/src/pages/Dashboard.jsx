import Navbar
from "../components/Navbar";

import "../assets/css/Dashboard.css";

const Dashboard = () => {

  const user =
  JSON.parse(
  localStorage.getItem("user")
  );

  return (

    <>

      <Navbar />

      <div className="dashboard">

        <h1>

          Welcome,
          {" "}
          {user?.name}

        </h1>

        <div
          className="stats-grid"
        >

          <div
            className="stat-card"
          >
            <h3>
              Total Books
            </h3>

            <p>0</p>
          </div>

          <div
            className="stat-card"
          >
            <h3>
              Categories
            </h3>

            <p>0</p>
          </div>

          <div
            className="stat-card"
          >
            <h3>
              Issued Books
            </h3>

            <p>0</p>
          </div>

          <div
            className="stat-card"
          >
            <h3>
              Students
            </h3>

            <p>0</p>
          </div>

        </div>

      </div>

    </>
  );
};

export default Dashboard;