import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const TeacherDashboard = () => {

  return (

    <>
      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <div className="dashboard-content">

          <h1>
            Teacher Dashboard
          </h1>

          <p>
            View and borrow books.
          </p>

        </div>

      </div>

    </>
  );
};

export default TeacherDashboard;