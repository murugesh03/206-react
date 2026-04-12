import { useState } from "react";
import "./App.css";
import Footer from "./components/organisms/footer";
import Header from "./components/organisms/header";
import RoutePage from "./routes";
import { CartProvider } from "./utils/CartContext";
function App() {
  const [counter, setCounter] = useState(0);
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <p>Counter: {counter}</p>
        <button onClick={() => setCounter(counter + 1)}>
          Increment counter
        </button>
        <RoutePage />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
