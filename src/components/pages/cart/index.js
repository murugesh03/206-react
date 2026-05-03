import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// DEPRECATED: Old context API - kept for reference
// import { CartContext } from "../../../context/cart/CartContext";
import { useCounter } from "../../../hooks/count";
import {
  useClearCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation
} from "../../../redux/api/cart";
import {
  removeFromCart,
  updateQuantity
} from "../../../redux/slices/cart/cartSlice";
import "./style.css"; // We'll create this CSS file

const Cart = (props) => {
  // Get userId from Redux auth state
  const userId = useSelector((state) => state.auth?.user?.id);

  // DEPRECATED: Old context API - kept for reference
  // const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const { count, increment } = useCounter();

  // RTK Query - NEW APPROACH
  const { data: cartData, isLoading: isCartLoading } = useGetCartQuery(userId, {
    skip: !userId
  });
  const [removeFromCartMutation] = useRemoveFromCartMutation();
  const [updateCartQuantityMutation] = useUpdateCartQuantityMutation();
  const [clearCartMutation] = useClearCartMutation();

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        console.log("this is caluclated");
        return total + item.quantity;
      }, 0),
    [cartItems]
  );

  const handleQuantityChange = async (id, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        // RTK Query - NEW APPROACH using useRemoveFromCartMutation
        if (userId) {
          await removeFromCartMutation({ userId, itemId: id }).unwrap();
        } else {
          // DEPRECATED: Fallback to Redux slice (kept for reference)
          dispatch(removeFromCart(id));
        }
      } else {
        // RTK Query - NEW APPROACH using useUpdateCartQuantityMutation
        if (userId) {
          await updateCartQuantityMutation({
            userId,
            itemId: id,
            quantity: newQuantity
          }).unwrap();
        } else {
          // DEPRECATED: Fallback to Redux slice (kept for reference)
          dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      // Fallback to local state
      if (newQuantity <= 0) {
        dispatch(removeFromCart(id));
      } else {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
      }
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      // RTK Query - NEW APPROACH using useRemoveFromCartMutation
      if (userId) {
        await removeFromCartMutation({ userId, itemId: id }).unwrap();
      } else {
        // DEPRECATED: Fallback to Redux slice (kept for reference)
        dispatch(removeFromCart(id));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      // Fallback to local state
      dispatch(removeFromCart(id));
    }
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
              {/* <span>${getTotalPrice().toFixed(2)}</span> */}
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
