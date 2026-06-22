import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";

import AdminDashboard from "../pages/AdminDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import LibrarianDashboard from "../pages/LibrarianDashboard";

import Books from "../pages/Books";
import Categories from "../pages/Categories";
import Users from "../pages/Users";
import BorrowHistory from "../pages/BorrowHistory";
import IssueBook from "../pages/IssueBook";
import ReturnBook from "../pages/ReturnBook";
import FineDashboard from "../pages/FineDashboard";
import PendingFines from "../pages/PendingFines";
import FinePayment from "../pages/FinePayment";
import EBooks from "../pages/EBooks";
import AddEBook from "../pages/AddEBook";
import EBookDetails from "../pages/EBookDetails";

import ProtectedRoute from "../components/ProtectedRoute";
import RoleRoute from "../components/RoleRoute";

import AddLibrarian
from "../pages/AddLibrarian";

import AddBook
from "../pages/AddBook";

import EditBook
from "../pages/EditBook";

import BookDetails from "../pages/BookDetails";

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>

        {/* Default Route */}

        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />

        {/* Public Routes */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Role Based Dashboards */}

        <Route
          path="/admin-dashboard"
          element={
            <RoleRoute
              allowedRoles={["admin"]}
            >
              <AdminDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/teacher-dashboard"
          element={
            <RoleRoute
              allowedRoles={["teacher"]}
            >
              <TeacherDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/student-dashboard"
          element={
            <RoleRoute
              allowedRoles={["student"]}
            >
              <StudentDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/librarian-dashboard"
          element={
            <RoleRoute
              allowedRoles={["librarian"]}
            >
              <LibrarianDashboard />
            </RoleRoute>
          }
        />

        {/* Common Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issue-book"
          element={
            <ProtectedRoute>
              <IssueBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/return-book"
          element={
            <ProtectedRoute>
              <ReturnBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/borrow-history"
          element={
            <ProtectedRoute>
              <BorrowHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fines"
          element={
            <ProtectedRoute>
              <FineDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pending-fines"
          element={
            <ProtectedRoute>
              <PendingFines />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fine-payment/:id"
          element={
            <ProtectedRoute>
              <FinePayment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-librarian"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AddLibrarian />
            </RoleRoute>
          }
        />

        <Route
          path="/add-book"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-book/:id"
          element={
            <ProtectedRoute>
              <EditBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books/:id"
          element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ebooks"
          element={
            <ProtectedRoute>
              <EBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-ebook"
          element={
            <RoleRoute allowedRoles={["admin", "librarian"]}>
              <AddEBook />
            </RoleRoute>
          }
        />

        <Route
          path="/ebooks/:id"
          element={
            <ProtectedRoute>
              <EBookDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>

  );
};

export default AppRoutes;