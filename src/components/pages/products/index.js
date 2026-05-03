import { useDispatch } from "react-redux";
import "../../../components/organisms/productcard/style.css";
// DEPRECATED: Old context API - kept for reference
// import { CartContext } from "../../../context/cart/CartContext";
import { useGetAllProductsQuery } from "../../../redux/api/products";
import { addToCart } from "../../../redux/slices/cart/cartSlice";
import "./style.css";

const Products = () => {
  // DEPRECATED: Old context API - kept for reference
  // const { addToCart } = useContext(CartContext);
  const dispatch = useDispatch();

  // RTK Query - NEW APPROACH
  const { data: productsData, isLoading, error } = useGetAllProductsQuery();
  const products = productsData?.products || [];

  // DEPRECATED: Hard-coded products (kept for reference)
  // const products = [
  //   {
  //     id: 1,
  //     name: "Laptop",
  //     price: 999.99,
  //     description: "High-performance laptop with latest processors",
  //     image: "laptop.jpg"
  //   },
  //   ... more products
  // ];
  //     description: "Mechanical gaming keyboard with RGB lighting",
  //     image: "keyboard.jpg"
  //   }
  // ];

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Check out our amazing collection of tech products</p>
      </div>

      {isLoading && <p>Loading products...</p>}
      {error && (
        <p style={{ color: "red" }}>Error loading products: {error.message}</p>
      )}

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
                  onClick={() => {
                    // addToCart(product);
                    dispatch(addToCart(product));
                  }}
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
