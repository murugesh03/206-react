import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
// import { useAuth } from "../hooks/auth";

/**
 * ProtectedRoute Component (Enhanced version)
 * Protects routes by checking authentication status
 * Uses Redux auth state for authentication
 * Shows loading state while checking auth
 * Redirects unauthenticated users to login page
 *
 * @param {Object} props - Component props
 * @param {React.Component} props.element - The component to render if authenticated
 * @param {string} props.redirectPath - Path to redirect if not authenticated (default: '/login')
 * @param {Array} props.allowedRoles - Allowed user roles for this route (optional)
 * @returns {React.Component} - Loading state, protected component, or redirect to login
 */
const ProtectedRoute = ({
  element,
  redirectPath = "/login",
  allowedRoles = null
}) => {
  // const { isAuthenticated, user, loading } = useAuth();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Check if user has required role (if specified)
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the protected component

  //Outlet is renders the given all child elements as a wrapper
  //   return <Outlet />;
  return element;
};

export default ProtectedRoute;
