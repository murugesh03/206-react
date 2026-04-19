import { object, ref, string } from "yup";

export const validationSchema = object({
  address: string().max(100, "Address must be less than 100 characters"),
  username: string().required("Username is required"),
  email: string().email("Invalid email address").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters")
    .required("Password is required"),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Confirm Password is required")
  // .test("passwords-match", "Passwords must match", (value) => {
  //   return formik.values.password === value;
  // })
});
