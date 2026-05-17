import { lazy, Suspense } from "react";
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
import Cart from "../components/pages/cart";
import Contact from "../components/pages/contact";
import HomePage from "../components/pages/home";
import LoginPage from "../components/pages/login";
import AllProducts from "../components/pages/shop/AllProducts";
import Category from "../components/pages/shop/Category";
import SignupPage from "../components/pages/signup";
import UnauthorizedPage from "../components/pages/unauthorized";
import withAuth from "../HOC/AuthAdminHoc";
import ProtectedRoute from "./ProtectedRoute";

// DEMO: Lazy load ProductDetail with artificial 2s delay to make Suspense fallback visible
// In production, remove the Promise wrapper: lazy(() => import("../components/pages/shop/ProductDetail"))
const ProductDetail = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(
        () => resolve(import("../components/pages/shop/ProductDetail")),
        2000
      )
    )
);

const AdminProductsLazy = lazy(
  () => import("../components/pages/admin/Products")
);
const AdminUsersLazy = lazy(() => import("../components/pages/admin/Users"));
function RoutePage() {
  const adminRoles = ["admin"];
  //HOC component example
  const AuthenticatedAdminLayout = withAuth(AdminLayout);
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route
        path="/products"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AllProducts />
          </Suspense>
        }
      />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />

      {/* DEMO: Suspense + lazy loading — fallback shows for 2s on first visit */}
      <Route
        path="product/:productId"
        element={
          <Suspense
            fallback={<div className="loading-spinner">Loading product...</div>}
          >
            <ProductDetail />
          </Suspense>
        }
      />

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
      <Route path="/admin" element={<AuthenticatedAdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route
          path="products"
          element={
            <Suspense fallback={<div>Loading products...</div>}>
              <AdminProductsLazy />
            </Suspense>
          }
        />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsersLazy />} />
      </Route>
    </Routes>
  );
}

export default RoutePage;
