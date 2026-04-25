import { useContext } from "react";
import "../../../components/organisms/productcard/style.css";
import { CartContext } from "../../../context/cart/CartContext";
import "./style.css";

const Products = () => {
  const { addToCart } = useContext(CartContext);

  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 999.99,
      description: "High-performance laptop with latest processors",
      image: "laptop.jpg"
    },
    {
      id: 2,
      name: "Smartphone",
      price: 699.99,
      description: "Latest smartphone with advanced camera",
      image: "phone.jpg"
    },
    {
      id: 3,
      name: "Headphones",
      price: 199.99,
      description: "Noise-cancelling wireless headphones",
      image: "headphones.jpg"
    },
    {
      id: 4,
      name: "Tablet",
      price: 499.99,
      description: "Portable tablet for work and entertainment",
      image: "tablet.jpg"
    },
    {
      id: 5,
      name: "Smart Watch",
      price: 299.99,
      description: "Feature-rich smartwatch with fitness tracking",
      image: "watch.jpg"
    },
    {
      id: 6,
      name: "Keyboard",
      price: 129.99,
      description: "Mechanical gaming keyboard with RGB lighting",
      image: "keyboard.jpg"
    }
  ];

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Check out our amazing collection of tech products</p>
      </div>

      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${product.price}</span>

                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
