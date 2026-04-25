import React, { useCallback, useEffect, useRef } from "react";
import { useFetch } from "../../../hooks/fetch";
import ProductCard from "../../organisms/productcard";

import { useLocation } from "react-router";

const HomePage = () => {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();
  const locationValues = location.state || {};
  console.log(locationValues, "location");
  // const [loading, setLoading] = useState(false);
  // const [products, setProducts] = useState([]);
  // const [productAdded, setProductAdded] = useState(false);
  const { data: products, loading } = useFetch(
    "https://dummyjson.com/products"
  );
  console.log(products, "this is data");
  // const product = document.getElementById("home-page");
  // product.innerText = "Home page";
  // const fetchAllProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch("https://dummyjson.com/products");
  //     const data = await response.json();
  //     console.log(data);
  //     setProducts(data.products);
  //     productAddedSuccessfully();
  //   } catch (error) {
  //     console.log(error, "this erro");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const productAddedSuccessfully = useCallback(() => {
    console.log("this is from parent");
    // setProductAdded(true);
    // setTimeout(() => setProductAdded(false), 2000);
  }, []);
  console.log("same fuction", ref.current === productAddedSuccessfully);
  ref.current = productAddedSuccessfully;

  const handleChange = (e) => {
    console.log("recreated");
    console.log(e.target.value);
  };
  console.log("handle change fuction", inputRef.current === handleChange);
  inputRef.current = handleChange;
  //Mounting phase
  // useEffect(() => {
  //   console.log("component did mount");
  //   fetchAllProducts();
  // }, []);

  //unmounting phase
  useEffect(() => {
    return () => {
      console.log("component will unmount");
      clearInterval();
    };
  }, []);

  //updating phase
  useEffect(() => {
    console.log("component did update", products);
    console.log(ref.current, "ref current");
    // const text = document.getElementById();
    // if (ref.current) {
    //   ref.current.innerText = `Total Products: ${products.length}`;
    //   ref.current.addEventListener("click", () => {
    //     console.log("Ref clicked");
    //   });
    // }
  }, [products]);

  return (
    <div className="home-page">
      <h1 className="text-2xl font-bold" id="home-page">
        Home page
      </h1>
      {/* {productAdded && <p>Product Added Successfully</p>} */}
      <input value="same" onChange={handleChange} />
      {/* <p ref={ref}></p> */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="products-grid">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addedSuccessfully={productAddedSuccessfully}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(HomePage);
