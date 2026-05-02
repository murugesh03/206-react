import { Navigate, NavLink, Outlet } from "react-router";
import { useSelector } from "react-redux";
// import { useAuth } from "../../../hooks/auth";
import "./style.css";

const AccountLayout = () => {
  // const { isAuthenticated, loading } = useAuth();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

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

  return (
    <div className="account-layout">
      <div className="account-container">
        <aside className="account-sidebar">
          <h2>Account</h2>
          <nav className="account-nav">
            <NavLink
              to="/account/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/account/settings"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Settings
            </NavLink>
            <NavLink
              to="/account/orders"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              My Orders
            </NavLink>
            <NavLink
              to="/account/wishlist"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Wishlist
            </NavLink>
          </nav>
        </aside>
        <main className="account-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
