import ProductWrapper from "./ProductWrapper";

function Product(props) {
  //   const { element } = props;
  //   const { sku, title } = element;
  const { sku, title } = props;
  console.log(props, "this is props");
  return (
    <>
      <p className={`text-lg ${sku}`} key={sku}>
        {title}
      </p>
      <p>{title}</p>
      <ProductWrapper title={title} />
    </>
  );
}

export default Product;
