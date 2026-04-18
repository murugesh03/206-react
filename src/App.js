import "./App.css";
import Footer from "./components/organisms/footer";
import Header from "./components/organisms/header";
import { CartProvider } from "./context/cart/CartContext";
import { useCounter } from "./hooks/count";
import RoutePage from "./routes";
function App() {
  const { count, increment, decrement, reset } = useCounter();
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <p>Counter: {count}</p>
        <button onClick={increment}>Increment counter</button>
        <RoutePage />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
