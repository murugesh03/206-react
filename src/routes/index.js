import { Route, Routes } from "react-router";
import AccountLayout from "../components/layouts/AccountLayout";
import ShopLayout from "../components/layouts/ShopLayout";
import About from "../components/pages/about";
import Orders from "../components/pages/account/Orders";
import Profile from "../components/pages/account/Profile";
import Settings from "../components/pages/account/Settings";
import Wishlist from "../components/pages/account/Wishlist";
import Cart from "../components/pages/cart";
import Contact from "../components/pages/contact";
import HomePage from "../components/pages/home";
import LoginPage from "../components/pages/login";
import Products from "../components/pages/products";
import AllProducts from "../components/pages/shop/AllProducts";
import Category from "../components/pages/shop/Category";
import ProductDetail from "../components/pages/shop/ProductDetail";
import SignupPage from "../components/pages/signup";

function RoutePage() {
  const admin = false;
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="product/:productId" element={<ProductDetail />} />

      {/* Nested Shop Routes */}
      <Route path="/shop" element={<ShopLayout />}>
        <Route index element={<AllProducts />} />
        <Route path="category/:categoryName" element={<Category />} />
      </Route>

      {/* Nested Account Routes */}
      <Route path="/account" element={<AccountLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="orders" element={<Orders />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>
    </Routes>
  );
}

export default RoutePage;
