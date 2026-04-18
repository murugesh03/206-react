import { useEffect, useState } from "react";
import ProductWrapper from "./ProductWrapper";
function Home() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.log(error, "this erro");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  /*
  Component Did mount in class component 
  componentDidMount(){}

  functional component
  useEffect(()=>{}, []) in functional component it runs only once after the render method

  componentDidUpdate in class component 
  componentDidUpdate()

  functional component
  const name = 'sam'
  useEffect(()=>{}, [dependency]) in functional component is run when ever the dependecies values are changed 

  component will unmount in class component 
  componentWillUnmount(){}

  functional component
  const name = 'sam'
  useEffect(()=>{
    return ()=> {}
  }, [dependency]) in functional component when ever the unmounting dom elemets are called

  */
  // const renderContent = () => {
  //   if (loading) {
  //     return <p> Loading...</p>;
  //   } else {
  //     return products?.map((ele) => (
  //       <ProductWrapper key={ele.sku}>
  //         <p>{ele.id}</p>
  //       </ProductWrapper>
  //     ));
  //   }
  // };
  return (
    <div>
      <h1 className="text-2xl font-bold" id="home-page">
        Home page
      </h1>
      <p>Total Products: {products.length}</p>
      {loading ? (
        <p> Loading...</p>
      ) : (
        products?.map((ele) => (
          <ProductWrapper key={ele.sku}>
            <p>{ele.id}</p>
          </ProductWrapper>
        ))
      )}

      {/* {renderContent()} */}
    </div>
  );
}

export default Home;
