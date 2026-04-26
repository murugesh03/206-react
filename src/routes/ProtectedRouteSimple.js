import React from "react";
import { Navigate } from "react-router";

/**
 * ProtectedRouteSimple Component
 * Simple version for protecting routes using props
 * No context required - pass authentication status directly
 *
 * @param {Object} props - Component props
 * @param {React.Component} props.element - The component to render if authenticated
 * @param {boolean} props.isAuthenticated - Authentication status
 * @param {string} props.redirectPath - Path to redirect if not authenticated (default: '/login')
 * @returns {React.Component} - Either the protected component or redirect to login
 */
const ProtectedRouteSimple = ({
  element,
  isAuthenticated = false,
  redirectPath = "/login"
}) => {
  return isAuthenticated ? element : <Navigate to={redirectPath} replace />;
};

export default ProtectedRouteSimple;
