import { Component } from "react";

export default class Home extends Component {
  constructor(name) {
    super();
    console.log("this is constructor");
    this.state = {
      loading: false,
      products: [],
      totalProduct: 0
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log("this is componentDidMount");
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const slicedProduct = data.products.slice(0, 10);
        this.setState({ products: slicedProduct, loading: false });
      })
      .catch((error) => {
        console.log(error);
      });

    this.interval = setInterval(() => {
      console.log("Time running ");
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.products.length, prevState.products.length);
    if (prevState.products.length !== this.state.products.length) {
      this.setState({ totalProduct: this.state.products.length });
    }
  }

  componentWillUnmount() {
    console.log("Component will unmount");
    clearInterval(this.interval);
  }

  render() {
    console.log(
      this.state.loading,
      this.state.products.length,
      "this is render method"
    );
    return (
      <div>
        <h1>Home page</h1>
        <p>Total Products: {this.state.totalProduct}</p>
        {this.state.loading ? (
          <p> Loading...</p>
        ) : (
          this.state.products?.map((ele) => <p>{ele.title}</p>)
        )}
      </div>
    );
  }
}
