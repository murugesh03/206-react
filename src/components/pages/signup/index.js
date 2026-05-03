import { useFormik } from "formik";
import { useNavigate } from "react-router";

import { useSignupMutation } from "../../../redux/api/auth";
import FileUpload from "../../organisms/fileupload";
import "./style.css";
import { validationSchema } from "./utils";

const SignupPage = () => {
  // DEPRECATED: Old form state management (kept for reference)
  // const [formData, setFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: ""
  // });

  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");

  /* const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Add signup logic here
    setSuccess("Signup successful!");
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };
*/

  const navigate = useNavigate();

  // RTK Query - NEW APPROACH
  const [signupMutation, { isLoading: isSignupLoading }] = useSignupMutation();

  const handleSubmit = async (values) => {
    try {
      console.log(values, "this is values");

      // RTK Query - NEW APPROACH using useSignupMutation
      const response = await signupMutation({
        username: values.username,
        email: values.email,
        password: values.password
      }).unwrap();

      console.log("Signup successful:", response);
      // Redirect to login page after successful signup
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema,
    onSubmit: handleSubmit
  });

  console.log(formik, "this is formik");
  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Create Account</h1>
        <form onSubmit={formik.handleSubmit} action="/signup" method="POST">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // value={formData.username}
              // onChange={handleChange}

              // required
            />
            {formik.errors.username && (
              <p style={{ color: "red" }}>{formik.errors.username}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}

              // value={formData.email}
              // onChange={handleChange}
              // required
            />
            {formik.errors.email && (
              <p style={{ color: "red" }}>{formik.errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}

              // value={formData.password}
              // onChange={handleChange}
              // required
            />
            {formik.errors.password && (
              <p style={{ color: "red" }}>{formik.errors.password}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}

              // value={formData.confirmPassword}
              // onChange={handleChange}
              // required
            />
            {formik.errors.confirmPassword && (
              <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>
            )}
          </div>

          <div className="form-group">
            <label>Profile Picture:</label>
            <FileUpload />
          </div>
          {/* 
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>} */}

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
