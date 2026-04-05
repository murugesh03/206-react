const ProductWrapper = (props) => {
  const { children } = props;
  console.log(children);
  return (
    <div>
      <p>Product Wrapper</p>
      {children}
    </div>
  );
};

export const AuthWrapper = (props) => {
  const { children } = props;
  console.log(children);
  return (
    <div>
      <p>AuthWrapper </p>
      {children}
    </div>
  );
};

export default ProductWrapper;
