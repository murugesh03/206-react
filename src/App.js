import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router";
import "./App.css";
import Footer from "./components/organisms/footer";
import Header from "./components/organisms/header";
import { productsApi } from "./redux/api/apiClient";
import { loadAuth } from "./redux/slices/auth/authSlice";
import { loadCart } from "./redux/slices/cart/cartSlice";
import { store } from "./redux/store";
import RoutePage from "./routes";

function AppContent() {
  const dispatch = useDispatch();

  // Initialize auth and cart state from localStorage on app load
  useEffect(() => {
    dispatch(loadAuth());
    // Load cart from localStorage if it exists
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      dispatch(loadCart(JSON.parse(savedCart)));
    }

    // Debug: expose and log store state snapshot
    // eslint-disable-next-line no-console
    console.log("STORE STATE:", store.getState());
  }, [dispatch]);

  // Force a products query once on mount to verify RTK Query baseQuery runs
  useEffect(() => {
    dispatch(productsApi.endpoints.getAllProducts.initiate());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {/* <p>Counter: {count}</p> */}
        {/* <button onClick={increment}>Increment counter</button> */}
        <RoutePage />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

function App() {
  // const { count, increment, decrement, reset } = useCounter();
  return (
    // <AuthProvider>
    //   <CartProvider>
    <Provider store={store}>
      <AppContent />
    </Provider>
    //   </CartProvider>
    // </AuthProvider>
  );
}

export default App;
