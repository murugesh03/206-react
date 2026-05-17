import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);

    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner">Loading...</div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user?.role !== "admin") {
      return <Navigate to="/unauthorized" replace />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
