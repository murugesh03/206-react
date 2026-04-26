import { Navigate, NavLink, Outlet } from "react-router";
import { useAuth } from "../../../context/auth/AuthContext";
import "./style.css";

const AdminLayout = () => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has admin role
  if (user?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="admin-layout">
      <div className="admin-container">
        <aside className="admin-sidebar">
          <h2>Admin Panel</h2>
          <nav className="admin-nav">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/admin/add-product"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Add Product
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Users
            </NavLink>
          </nav>
        </aside>
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
