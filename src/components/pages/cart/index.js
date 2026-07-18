import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCounter } from "../../../hooks/count";
import {
  useClearCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation
} from "../../../redux/api/cart";
import {
  useCreateOrderMutation,
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation
} from "../../../redux/api/orders";
import {
  clearCart,
  loadCart,
  removeFromCart,
  updateQuantity
} from "../../../redux/slices/cart/cartSlice";
import "./style.css"; // We'll create this CSS file

const Cart = (props) => {
  // Get userId from Redux auth state
  const userId = useSelector((state) => state.auth?.user?.id);
  const authUser = useSelector((state) => state.auth?.user);

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
  const [createOrderMutation] = useCreateOrderMutation();
  const [createPaymentOrderMutation] = useCreatePaymentOrderMutation();
  const [verifyPaymentMutation] = useVerifyPaymentMutation();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    if (userId && cartData?.cart?.items) {
      dispatch(loadCart(cartData.cart.items));
    }
  }, [cartData, dispatch, userId]);

  const totalPrice = useMemo(
    () => cartItems.reduce((totalItems, item) => totalItems + item.quantity, 0),
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

  const handleCheckout = async () => {
    if (!userId || cartItems.length === 0) {
      return;
    }

    setIsProcessingPayment(true);

    try {
      const createdOrder = await createOrderMutation({
        userId,
        items: cartItems.map((item) => ({
          productId: item.id || item.productId,
          quantity: item.quantity,
          price: Number(item.price || 0)
        })),
        total: Number(total || 0),
        shippingAddress: "Payment test address",
        paymentMethod: "Razorpay"
      }).unwrap();

      const orderId =
        createdOrder?.order?._id ||
        createdOrder?.order?.id ||
        createdOrder?._id ||
        createdOrder?.id;
      if (!orderId) {
        throw new Error("Order ID was not returned by the backend.");
      }

      const paymentOrder = await createPaymentOrderMutation({
        orderId,
        amount: Math.round(Number(total || 0) * 100),
        currency: "INR"
      }).unwrap();

      const razorpayOrder = paymentOrder?.order || paymentOrder;
      const scriptId = "razorpay-checkout-script";
      const existingScript = document.getElementById(scriptId);

      if (!existingScript) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_demo",
            amount:
              razorpayOrder?.amount || Math.round(Number(total || 0) * 100),
            currency: razorpayOrder?.currency || "INR",
            name: "206 Shop",
            description: `Payment for order ${orderId}`,
            order_id: razorpayOrder?.id,
            handler: async (response) => {
              try {
                await verifyPaymentMutation({
                  orderId,
                  paymentDetails: {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature
                  }
                }).unwrap();
                await clearCartMutation(userId).unwrap();
                dispatch(clearCart());
                window.alert(
                  "Payment successful. Your order has been confirmed."
                );
              } catch (error) {
                console.error("Error verifying payment:", error);
                window.alert(
                  "Payment verification failed. Please contact support."
                );
              } finally {
                setIsProcessingPayment(false);
              }
            },
            prefill: {
              name: authUser?.name || "Customer",
              email: authUser?.email || "",
              contact: authUser?.contact || ""
            },
            theme: { color: "#3399cc" },
            modal: {
              ondismiss: () => setIsProcessingPayment(false)
            }
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        };
        script.onerror = () => {
          setIsProcessingPayment(false);
          window.alert("Razorpay script could not be loaded.");
        };
        document.body.appendChild(script);
      } else if (window.Razorpay) {
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_demo",
          amount: razorpayOrder?.amount || Math.round(Number(total || 0) * 100),
          currency: razorpayOrder?.currency || "INR",
          name: "206 Shop",
          description: `Payment for order ${orderId}`,
          order_id: razorpayOrder?.id,
          handler: async (response) => {
            try {
              await verifyPaymentMutation({
                orderId,
                paymentDetails: {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature
                }
              }).unwrap();
              await clearCartMutation(userId).unwrap();
              dispatch(clearCart());
              window.alert(
                "Payment successful. Your order has been confirmed."
              );
            } catch (error) {
              console.error("Error verifying payment:", error);
              window.alert(
                "Payment verification failed. Please contact support."
              );
            } finally {
              setIsProcessingPayment(false);
            }
          },
          prefill: {
            name: authUser?.name || "Customer",
            email: authUser?.email || "",
            contact: authUser?.contact || ""
          },
          theme: { color: "#3399cc" },
          modal: {
            ondismiss: () => setIsProcessingPayment(false)
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setIsProcessingPayment(false);
        window.alert("Razorpay is not available right now.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setIsProcessingPayment(false);
      window.alert("Checkout failed. Please try again.");
    }
  };

  const handleClearCart = async () => {
    try {
      if (userId) {
        await clearCartMutation(userId).unwrap();
      } else {
        dispatch(clearCart());
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
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
            {cartItems.map((item) => {
              const descriptionText =
                typeof item.description === "string"
                  ? item.description
                  : item.description
                    ? String(item.description)
                    : "";

              return (
                <div key={item.id || item.productId} className="cart-item">
                  <div className="item-image">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p>{descriptionText.substring(0, 100)}...</p>
                    <div className="item-price">
                      <span className="price">
                        ${Number(item.price || 0).toFixed(2)}
                      </span>
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
                          handleQuantityChange(
                            item.id || item.productId,
                            item.quantity - 1
                          )
                        }
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id || item.productId,
                            item.quantity + 1
                          )
                        }
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        handleRemoveItem(item.id || item.productId)
                      }
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="item-total">
                    $
                    {(
                      Number(item.price || 0) * Number(item.quantity || 0)
                    ).toFixed(2)}
                  </div>
                </div>
              );
            })}
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
              <span>${Number(total || 0).toFixed(2)}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? "Processing..." : "Proceed to Checkout"}
            </button>
            <button className="remove-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
