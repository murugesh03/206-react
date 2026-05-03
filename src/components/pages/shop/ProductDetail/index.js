import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router";
// DEPRECATED: Old custom fetch hook - kept for reference
// import { useFetch } from "../../../../hooks/fetch";
import { useGetProductByIdQuery } from "../../../../redux/api/products";
import { addToCart } from "../../../../redux/slices/cart/cartSlice";
import "../shop-enhanced.css";

const ProductDetail = () => {
  const params = useParams(); // getting dynamic route values eg: product/:productId
  const [searchParams, setSearchParams] = useSearchParams(); // Getting query params value eg: ?email=john@example.com
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const age = searchParams.get("age");
  //   console.log(searchParams);
  //   console.log(email);
  //   console.log(name);
  //   console.log(age);
  //   console.log(params, "this params");
  const { productId } = params;
  const navigate = useNavigate();
  console.log(navigate, "this is navigatet");
  // const { addToCart } = useContext(CartContext);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  // RTK Query - NEW APPROACH using useGetProductByIdQuery
  const {
    data: product,
    isLoading: loading,
    error
  } = useGetProductByIdQuery(productId);

  // DEPRECATED: Old fetch hook (kept for reference)
  // const {
  //   data: product,
  //   loading,
  //   error
  // } = useFetch(`https://dummyjson.com/products/${productId}`);

  const handleAddToCart = () => {
    // addToCart({ ...product, quantity });
    dispatch(addToCart({ ...product, quantity }));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };

  const originalPrice = product
    ? (product.price / (1 - (product.discountPercentage || 0) / 100)).toFixed(2)
    : 0;
  const savings = product ? (originalPrice - product.price).toFixed(2) : 0;

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <button
          className="btn-back"
          onClick={() =>
            navigate(-1, {
              state: {
                from: "product-detail"
              },
              replace: true
            })
          }
        >
          ← Back
        </button>
        <div className="error-message">
          <p>Product not found</p>
        </div>
      </div>
    );
  }

  //   ['shop', 'product-detail/1', '/', ]

  //['', 'product-detail/3']

  //A -> B -> C
  return (
    <div className="product-detail-page">
      <button
        className="btn-back"
        onClick={() =>
          navigate(-1, {
            state: {
              from: "product-detail"
            }
          })
        }
      >
        ← Back to Shop
      </button>

      <div className="product-detail-container">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <img
              src={product.images?.[selectedImage] || product.thumbnail}
              alt={product.title}
            />
            {product.discountPercentage > 0 && (
              <div className="discount-badge-large">
                {product.discountPercentage.toFixed(0)}% OFF
              </div>
            )}
          </div>
          <div className="thumbnail-gallery">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="product-details-section">
          {/* Category & Brand */}
          <div className="product-meta">
            <span className="category-badge">{product.category}</span>
            {product.brand && (
              <span className="brand-name">{product.brand}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="product-title-large">{product.title}</h1>

          {/* Rating */}
          <div className="rating-section">
            <div className="stars-large">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="rating-number">{product.rating}</span>
            <span className="rating-text">Based on customer reviews</span>
          </div>

          {/* Price Section */}
          <div className="price-section-large">
            <span className="current-price-large">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="original-price-large">${originalPrice}</span>
                <span className="savings-badge">Save ${savings}</span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="stock-section">
            <span
              className={`stock-badge ${
                product.availabilityStatus === "In Stock"
                  ? "in-stock-badge"
                  : "out-of-stock-badge"
              }`}
            >
              {product.availabilityStatus}
            </span>
            <span className="stock-count">{product.stock} items available</span>
          </div>

          {/* Description */}
          <div className="description-section">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Additional Info */}
          {product.warrantyInformation && (
            <div className="additional-info">
              <h3>Warranty Information</h3>
              <p>{product.warrantyInformation}</p>
            </div>
          )}

          {product.shippingInformation && (
            <div className="additional-info">
              <h3>Shipping Information</h3>
              <p>{product.shippingInformation}</p>
            </div>
          )}

          {product.returnPolicy && (
            <div className="additional-info">
              <h3>Return Policy</h3>
              <p>{product.returnPolicy}</p>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="purchase-section">
            <div className="quantity-selector-large">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                disabled={product.availabilityStatus !== "In Stock"}
              >
                {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              className={`add-to-cart-btn-large ${addedToCart ? "added" : ""}`}
              onClick={handleAddToCart}
              disabled={product.availabilityStatus !== "In Stock"}
            >
              {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
            <button className="btn-wishlist-large">♡ Add to Wishlist</button>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="badge">
              <span>✓</span>
              <p>Free Shipping on Orders Over $50</p>
            </div>
            <div className="badge">
              <span>✓</span>
              <p>30-Day Money Back Guarantee</p>
            </div>
            <div className="badge">
              <span>✓</span>
              <p>Secure Checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="reviews-section-detailed">
          <h2>Customer Reviews</h2>
          <div className="reviews-list">
            {product.reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <strong>{review.reviewerName}</strong>
                  <span className="review-rating">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="review-text">{review.comment}</p>
                <span className="review-date">{review.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
