import { useContext, useMemo } from "react";
import { CartContext } from "../../../context/cart/CartContext";
import { useCounter } from "../../../hooks/count";
import "./style.css"; // We'll create this CSS file

const Cart = (props) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useContext(CartContext);
  const { count, increment } = useCounter();

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        console.log("this is caluclated");
        return total + item.quantity;
      }, 0),
    [cartItems]
  );

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <p> {count}</p>
      <button onClick={increment}>Increment</button>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p>{item.description.substring(0, 100)}...</p>
                  <div className="item-price">
                    <span className="price">${item.price.toFixed(2)}</span>
                    {item.discountPercentage > 0 && (
                      <span className="original-price">
                        $
                        {(
                          item.price /
                          (1 - item.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{totalPrice}</span>
            </div>
            <div className="summary-row total">
              <span>Total Price:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
