import { useFormik } from "formik";

import FileUpload from "../../organisms/fileupload";
import "./style.css";
import { validationSchema } from "./utils";

const SignupPage = () => {
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

  const handleSubmit = (values) => {
    console.log(values, "this is values");
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
