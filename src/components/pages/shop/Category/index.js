import { useNavigate, useParams } from "react-router";
import "../shop.css";

const Category = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const categoryProducts = {
    electronics: [
      { id: 1, name: "Smartphone", price: "$699.99" },
      { id: 2, name: "Tablet", price: "$499.99" }
    ],
    computers: [
      { id: 3, name: "Laptop", price: "$999.99" },
      { id: 4, name: "Desktop PC", price: "$1299.99" }
    ],
    audio: [
      { id: 5, name: "Headphones", price: "$199.99" },
      { id: 6, name: "Speakers", price: "$249.99" }
    ],
    accessories: [
      { id: 7, name: "Keyboard", price: "$129.99" },
      { id: 8, name: "Mouse", price: "$49.99" }
    ],
    wearables: [
      { id: 9, name: "Smart Watch", price: "$299.99" },
      { id: 10, name: "Fitness Band", price: "$99.99" }
    ]
  };

  const products = categoryProducts[categoryName?.toLowerCase()] || [];

  const handleProductClick = (productId) => {
    navigate(`/shop/product/${productId}`);
  };

  return (
    <div className="category-view">
      <h1>{categoryName} Category</h1>
      <p>
        Showing {products.length} products in {categoryName}
      </p>

      {products.length > 0 ? (
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
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default Category;
