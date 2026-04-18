import { useContext } from "react";
import { CartContext } from "../../../context/cart/CartContext";
import "./style.css"; // Assuming you'll create a CSS file for styles

const Header = () => {
  const { getCartCount } = useContext(CartContext);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>Shopping Cart</h1>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="cart">
          <a href="/cart">Cart ({getCartCount()})</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
