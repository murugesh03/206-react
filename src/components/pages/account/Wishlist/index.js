import { useState } from "react";
import "../styles.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Laptop Pro",
      price: "$1299.99",
      date: "April 18, 2026"
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: "$149.99",
      date: "April 15, 2026"
    },
    {
      id: 3,
      name: "4K Monitor",
      price: "$599.99",
      date: "April 10, 2026"
    }
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="page-content">
      <h1>My Wishlist</h1>

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
                <button className="btn-add-cart">Add to Cart</button>
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
