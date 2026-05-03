import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
// import { CartContext } from "../../../context/cart/CartContext";
// import { useAuth } from "../../../hooks/auth";
import { logout as reduxLogout } from "../../../redux/slices/auth/authSlice";
import "./style.css";

const Header = () => {
  const navigate = useNavigate();
  // const { getCartCount } = useContext(CartContext);
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const getCartCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);
  // const { isAuthenticated, user, logout } = useAuth();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const handleHomePage = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // logout();
    dispatch(reduxLogout());
    navigate("/");
  };

  const dispatchFunc = (calback) => {
    console.log("Function generated");
    // Function implementation
    return calback;
  };
  dispatchFunc(() => console.log("Function called"))();
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1 onClick={handleHomePage} style={{ cursor: "pointer" }}>
            Shopping Cart
          </h1>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            {isAuthenticated && user?.role === "admin" && (
              <li>
                <NavLink to="/admin/dashboard">Admin</NavLink>
              </li>
            )}
            {isAuthenticated && user?.role !== "admin" && (
              <li>
                <NavLink to="/account/profile">Account</NavLink>
              </li>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <NavLink to="/signup">Signup</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li>
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                  title={`Logged in as ${user?.email}`}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
        <div className="cart">
          <NavLink to="/cart">Cart ({getCartCount()})</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
