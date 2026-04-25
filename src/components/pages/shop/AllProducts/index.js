import { useNavigate } from "react-router";
import "../shop.css";

const AllProducts = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Laptop",
      price: "$999.99",
      category: "Computers"
    },
    {
      id: 2,
      name: "Smartphone",
      price: "$699.99",
      category: "Electronics"
    },
    {
      id: 3,
      name: "Headphones",
      price: "$199.99",
      category: "Audio"
    },
    {
      id: 4,
      name: "Tablet",
      price: "$499.99",
      category: "Electronics"
    },
    {
      id: 5,
      name: "Smart Watch",
      price: "$299.99",
      category: "Wearables"
    },
    {
      id: 6,
      name: "Keyboard",
      price: "$129.99",
      category: "Accessories"
    }
  ];

  const handleProductClick = (productId) => {
    navigate(`/shop/product/${productId}`);
  };

  return (
    <div className="shop-products">
      <h1>All Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-item"
            onClick={() => handleProductClick(product.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="product-placeholder">{product.name}</div>
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="price">{product.price}</p>
            <button
              className="btn-view"
              onClick={(e) => {
                e.stopPropagation();
                handleProductClick(product.id);
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
