import { BrowserRouter } from "react-router";
import "./App.css";
import Footer from "./components/organisms/footer";
import Header from "./components/organisms/header";
import { AuthProvider } from "./context/auth/AuthContext";
import { CartProvider } from "./context/cart/CartContext";
import RoutePage from "./routes";
function App() {
  // const { count, increment, decrement, reset } = useCounter();
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <BrowserRouter>
            <Header />
            {/* <p>Counter: {count}</p> */}
            {/* <button onClick={increment}>Increment counter</button> */}
            <RoutePage />
            <Footer />
          </BrowserRouter>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
