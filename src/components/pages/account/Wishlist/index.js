import { useSelector } from "react-redux";

import { useAddToCartMutation } from "../../../../redux/api/cart";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation
} from "../../../../redux/api/wishlist";
import "../styles.css";

const Wishlist = () => {
  // Get userId from Redux auth state
  const userId = useSelector((state) => state.auth?.user?.id);

  // RTK Query - NEW APPROACH
  const {
    data: wishlistData,
    isLoading,
    error
  } = useGetWishlistQuery(userId, { skip: !userId });
  const [removeFromWishlistMutation] = useRemoveFromWishlistMutation();
  const [addToCartMutation] = useAddToCartMutation();

  const wishlist = wishlistData?.wishlist || [];

  // DEPRECATED: Hard-coded wishlist (kept for reference)
  // const [wishlist, setWishlist] = useState([
  //   {
  //     id: 1,
  //     name: "Laptop Pro",
  //     price: "$1299.99",
  //     date: "April 18, 2026"
  //   },
  //   {
  //     id: 2,
  //     name: "Wireless Earbuds",
  //     price: "$149.99",
  //     date: "April 15, 2026"
  //   },
  //   {
  //     id: 3,
  //     name: "4K Monitor",
  //     price: "$599.99",
  //     date: "April 10, 2026"
  //   }
  // ]);

  const removeFromWishlist = async (id) => {
    try {
      // RTK Query - NEW APPROACH using useRemoveFromWishlistMutation
      await removeFromWishlistMutation({
        userId,
        productId: id
      }).unwrap();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      // RTK Query - NEW APPROACH using useAddToCartMutation
      await addToCartMutation({
        userId,
        cartItem: {
          productId: item.id,
          quantity: 1,
          price: item.price
        }
      }).unwrap();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="page-content">
      <h1>My Wishlist</h1>

      {isLoading && <p>Loading wishlist...</p>}
      {error && (
        <p style={{ color: "red" }}>Error loading wishlist: {error.message}</p>
      )}

      {wishlist.length > 0 ? (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>Added: {item.date}</p>
              </div>
              <div className="item-price">
                <strong>{item.price}</strong>
              </div>
              <div className="item-actions">
                <button
                  className="btn-add-cart"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
                <button
                  className="btn-remove"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-wishlist">
          <p>Your wishlist is empty</p>
          <a href="/products" className="btn-shop">
            Explore Products
          </a>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
