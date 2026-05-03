import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
// import { useAuth } from "../../../hooks/auth";
import { login as reduxLogin } from "../../../redux/slices/auth/authSlice";
import "./style.css";
import { useLoginMutation } from "../../../redux/api/auth";

const LoginPage = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { isAuthenticated, login } = useAuth();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // RTK Query - NEW APPROACH
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();

  // If already authenticated, redirect to account page
  if (isAuthenticated) {
    return <Navigate to="/account/profile" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate email and password
      if (!email || !password) {
        setError("Please enter both email and password");
        setLoading(false);
        return;
      }

      // RTK Query - NEW APPROACH using useLoginMutation
      try {
        const response = await loginMutation({ email, password }).unwrap();
        // Handle successful login
        const token = response.token;
        const userData = response.user;
        dispatch(reduxLogin({ userData, token }));

        // Reset form and redirect based on role
        setEmail("");
        setPassword("");

        if (userData.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/account/profile");
        }
      } catch (rtqError) {
        // Handle RTK Query error
        console.error("RTK Query Login error:", rtqError);
        setError("Login failed via API. Using demo mode fallback...");

        // DEPRECATED: Fallback to demo mode (kept for reference)
        // Simulate API login (replace with real API call)
        // For demo purposes, detect admin role from email (contains "admin")
        const isAdmin = email.toLowerCase().includes("admin");

        const userData = {
          email: email,
          name: email.split("@")[0],
          id: Math.random().toString(36).substr(2, 9),
          joinDate: new Date().toLocaleDateString(),
          role: isAdmin ? "admin" : "user"
        };

        // Generate a simple token (in real app, get from server)
        const token = btoa(`${email}:${password}:${Date.now()}`);

        // Call login function from Redux
        // login(userData, token);
        dispatch(reduxLogin({ userData, token }));

        // Reset form and redirect
        setEmail("");
        setPassword("");

        // Redirect based on role
        if (isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/account/profile");
        }
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              ref={emailRef}
              onChange={handleEmail}
              onBlur={() => console.log("Email field blurred")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <div className="demo-info">
          <p>Demo: Use any email/password combination to login</p>
          <p>User: user@example.com / password123</p>
          <p>Admin: admin@example.com / password123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
