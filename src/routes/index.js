import { Route, Routes } from "react-router";
import Cart from "../components/pages/cart";
import HomePage from "../components/pages/home";
import LoginPage from "../components/pages/login";
import SignupPage from "../components/pages/signup";

function RoutePage() {
  const admin = false;
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default RoutePage;
