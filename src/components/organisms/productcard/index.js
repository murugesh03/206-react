import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAddToCartMutation } from "../../../redux/api/cart";
import { addToCart } from "../../../redux/slices/cart/cartSlice";
import "./style.css";
import { useAddToWishlistMutation } from "../../../redux/api/wishlist";

const ProductCard = React.memo(({ product, addedSuccessfully }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartValue, setCartValue] = useState(2);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?.id);

  // RTK Query - NEW APPROACH
  const [addToCartMutation, { isLoading: isAddToCartLoading }] =
    useAddToCartMutation();
  const [addToWishlistMutation, { isLoading: isAddToWishlistLoading }] =
    useAddToWishlistMutation();

  // const { addToCart } = useContext(CartContext);
  console.log(product, "this is product");

  const handleAddToCart = async () => {
    try {
      // RTK Query - NEW APPROACH using useAddToCartMutation
      if (userId) {
        await addToCartMutation({
          userId,
          cartItem: {
            productId: product.id,
            quantity: 1,
            price: product.price
          }
        }).unwrap();
      } else {
        // DEPRECATED: Fallback to Redux slice (kept for reference)
        // Add product to cart using context
        dispatch(addToCart(product));
      }

      // Show visual feedback
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000); // Reset after 2 seconds
      // Call the parent function to show success message
      addedSuccessfully();
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Fallback to local state
      dispatch(addToCart(product));
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
      addedSuccessfully();
    }
  };

  const handleAddToWishlist = async () => {
    try {
      // RTK Query - NEW APPROACH using useAddToWishlistMutation
      if (userId) {
        await addToWishlistMutation({
          userId,
          productId: product.id
        }).unwrap();
        console.log("Added to wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  return (
    <div
      className={`product-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="product-image">
        <img src={product.thumbnail} alt={product.title} />
        {product.discountPercentage > 0 && (
          <div className="discount-badge">
            -{product.discountPercentage.toFixed(0)}%
          </div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">
          {product.description.substring(0, 100)}...
        </p>
        <div className="product-rating">
          <span className="stars">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </span>
          <span className="rating-value">({product.rating})</span>
        </div>
        <div className="product-price">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.discountPercentage > 0 && (
            <span className="original-price">
              $
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                2
              )}
            </span>
          )}
        </div>
        <div className="product-stock">
          <span
            className={`stock-status ${product.availabilityStatus === "In Stock" ? "in-stock" : "out-of-stock"}`}
          >
            {product.availabilityStatus}
          </span>
          <span className="stock-quantity">({product.stock} left)</span>
        </div>
        <button
          className={`add-to-cart-btn ${addedToCart ? "added" : ""}`}
          onClick={handleAddToCart}
          disabled={product.availabilityStatus !== "In Stock"}
        >
          {addedToCart ? "Added to Cart!" : "Add to Cart"}
        </button>
        {/* <button onClick={() => navigate(`/product/${product.id}`)}>
          View Product
        </button> */}
      </div>
    </div>
  );
});

export default ProductCard;
