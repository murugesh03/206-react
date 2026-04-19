import { useContext } from "react";
import { Link, useNavigate } from "react-router";
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
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="cart">
          <Link href="/cart">Cart ({getCartCount()})</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
