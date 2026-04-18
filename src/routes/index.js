import Auth from "../components/organisms/auth";
import Cart from "../components/pages/cart";
import HomePage from "../components/pages/home";
import LoginPage from "../components/pages/login";
import SignupPage from "../components/pages/signup";

function RoutePage() {
  const admin = false;
  return (
    <div>
      <HomePage />
      <Auth admin={admin}>
        <Cart />
      </Auth>

      <LoginPage />

      <SignupPage />
    </div>
  );
}

export default RoutePage;
