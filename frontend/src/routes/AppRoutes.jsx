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

import ProtectedRoute from "../components/ProtectedRoute";
import RoleRoute from "../components/RoleRoute";

import AddLibrarian
from "../pages/AddLibrarian";

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
          path="/borrow-history"
          element={
            <ProtectedRoute>
              <BorrowHistory />
            </ProtectedRoute>
          }
        />

        {/* Invalid Routes */}

        <Route
          path="*"
          element={
            <Navigate to="/login" />
          }
        />

<Route
 path="/add-librarian"
 element={
  <RoleRoute
   allowedRoles={["admin"]}
  >
   <AddLibrarian />
  </RoleRoute>
 }
/>

      </Routes>

    </BrowserRouter>

  );
};

export default AppRoutes;