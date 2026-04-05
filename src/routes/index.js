import { useEffect, useState } from "react";
import ProductCard from "../components/organisms/productcard";

function RoutePage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.log(error, "this erro");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("component did mount");
    fetchAllProducts();
  }, []);

  useEffect(() => {
    console.log("component did update", products);
  }, [products]);

  return (
    <div className="home-page">
      <h1 className="text-2xl font-bold" id="home-page">
        Home page
      </h1>
      <p>Total Products: {products.length}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="products-grid">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RoutePage;
