import { Route, Routes } from "react-router";
import AccountLayout from "../components/layouts/AccountLayout";
import AdminLayout from "../components/layouts/AdminLayout";
import ShopLayout from "../components/layouts/ShopLayout";
import About from "../components/pages/about";
import Orders from "../components/pages/account/Orders";
import Profile from "../components/pages/account/Profile";
import Settings from "../components/pages/account/Settings";
import Wishlist from "../components/pages/account/Wishlist";
import AddProduct from "../components/pages/admin/AddProduct";
import AdminDashboard from "../components/pages/admin/Dashboard";
import AdminOrders from "../components/pages/admin/Orders";
import AdminProducts from "../components/pages/admin/Products";
import AdminUsers from "../components/pages/admin/Users";
import Cart from "../components/pages/cart";
import Contact from "../components/pages/contact";
import HomePage from "../components/pages/home";
import LoginPage from "../components/pages/login";
import Products from "../components/pages/products";
import AllProducts from "../components/pages/shop/AllProducts";
import Category from "../components/pages/shop/Category";
import ProductDetail from "../components/pages/shop/ProductDetail";
import SignupPage from "../components/pages/signup";
import UnauthorizedPage from "../components/pages/unauthorized";
import ProtectedRoute from "./ProtectedRoute";

function RoutePage() {
  const adminRoles = ["admin"];
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="product/:productId" element={<ProductDetail />} />

      {/* Nested Shop Routes */}
      <Route path="/shop" element={<ShopLayout />}>
        <Route
          index
          element={
            <ProtectedRoute
              allowedRoles={adminRoles}
              element={<AllProducts />}
            />
          }
        />
        {/* <ProtectedRoute allowedRoles={adminRoles}>
              <AllProducts />
            </ProtectedRoute> */}
        <Route path="category/:categoryName" element={<Category />} />
      </Route>

      {/* Protected Nested Account Routes */}
      <Route path="/account" element={<AccountLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="orders" element={<Orders />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
}

export default RoutePage;
