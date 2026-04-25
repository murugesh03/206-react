import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { CartContext } from "../../../context/cart/CartContext";
import "./style.css"; // Assuming you'll create a CSS file for styles
const Header = () => {
  const navigate = useNavigate();
  const { getCartCount } = useContext(CartContext);
  const handleHomePage = () => {
    navigate("/");
  };
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
            <li>
              <NavLink to="/account/profile">Account</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
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
