import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
// DEPRECATED: Old custom fetch hook - kept for reference
// import { useFetch } from "../../../hooks/fetch";
import {
  productsApi,
  useGetAllProductsQuery
} from "../../../redux/api/products";
import ProductCard from "../../organisms/productcard";

import { useLocation } from "react-router";

const HomePage = () => {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();
  const locationValues = location.state || {};
  console.log(locationValues, "location");

  // DEPRECATED: Old state management (kept for reference)
  // const [loading, setLoading] = useState(false);
  // const [products, setProducts] = useState([]);
  // const [productAdded, setProductAdded] = useState(false);

  // RTK Query - NEW APPROACH using useGetAllProductsQuery
  const {
    data: productsData,
    isLoading: loading,
    isError,
    error,
    refetch
  } = useGetAllProductsQuery();
  const products = productsData?.products || [];
  const [directFetchCount, setDirectFetchCount] = useState(null);
  const [directProducts, setDirectProducts] = useState([]);

  // DEPRECATED: Old fetch hook (kept for reference)
  // const { data: products, loading } = useFetch(
  //   "https://dummyjson.com/products"
  // );

  console.log(products, "this is data from RTK Query");
  console.log("productsData raw:", productsData);
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

  const dispatch = useDispatch();

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
    let mounted = true;
    // Direct fetch to verify network from browser
    (async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const json = await res.json();
        if (mounted) {
          setDirectFetchCount(json?.products?.length ?? 0);
          setDirectProducts(json?.products ?? []);
        }
      } catch (err) {
        if (mounted) setDirectFetchCount(-1);
      }
    })();
    return () => {
      mounted = false;
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

  // If products empty, try refetching once
  useEffect(() => {
    if (!loading && products?.length === 0) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manually dispatch the RTK Query initiate action once to ensure baseQuery is invoked
  useEffect(() => {
    dispatch(productsApi.endpoints.getAllProducts.initiate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(productsApi, "this is product api");
  return (
    <div className="home-page">
      <h1 className="text-2xl font-bold" id="home-page">
        Home page
      </h1>
      {/* {productAdded && <p>Product Added Successfully</p>} */}
      <input value="same" onChange={handleChange} />
      {/* <p ref={ref}></p> */}
      <div className="debug-info" style={{ marginTop: 12 }}>
        <strong>Debug:</strong>
        <div>isLoading: {String(loading)}</div>
        <div>isError: {String(isError)}</div>
        <div>products count: {products?.length ?? 0}</div>
        <div>
          direct fetch count:{" "}
          {directFetchCount === null ? "..." : directFetchCount}
        </div>
        {isError && <pre style={{ color: "red" }}>{JSON.stringify(error)}</pre>}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="products-grid">
          {(products?.length ? products : directProducts)?.map((product) => (
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
