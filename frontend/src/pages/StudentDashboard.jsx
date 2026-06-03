import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const StudentDashboard = () => {

  return (

    <>
      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <div className="dashboard-content">

          <h1>
            Student Dashboard
          </h1>

          <p>
            Browse and borrow books.
          </p>

        </div>

      </div>

    </>
  );
};

export default StudentDashboard;