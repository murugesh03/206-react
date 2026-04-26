import { useNavigate } from "react-router";
import "./style.css";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="unauthorized-page">
      <div className="unauthorized-container">
        <div className="error-content">
          <h1 className="error-code">403</h1>
          <h2 className="error-title">Access Denied</h2>
          <p className="error-message">
            You don't have permission to access this resource. Only
            administrators can view this page.
          </p>

          <div className="error-details">
            <p>
              If you believe this is an error, please contact the administrator.
            </p>
          </div>

          <div className="error-actions">
            <button className="btn btn-primary" onClick={handleGoHome}>
              Back to Home
            </button>
            <button className="btn btn-secondary" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        </div>

        <div className="error-illustration">
          <div className="lock-icon">
            <span>🔒</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
