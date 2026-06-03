import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const LibrarianDashboard = () => {

  return (

    <>
      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <div className="dashboard-content">

          <h1>
            Librarian Dashboard
          </h1>

          <p>
            Manage books and borrowing.
          </p>

        </div>

      </div>

    </>
  );
};

export default LibrarianDashboard;