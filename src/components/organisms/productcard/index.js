import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../../../context/cart/CartContext";
import "./style.css";
const ProductCard = React.memo(({ product, addedSuccessfully }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartValue, setCartValue] = useState(2);
  const { addToCart } = useContext(CartContext);
  console.log(product, "this is product");
  const handleAddToCart = () => {
    // Add product to cart using context
    addToCart(product);
    // Show visual feedback
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000); // Reset after 2 seconds
    // Call the parent function to show success message
    addedSuccessfully();
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
