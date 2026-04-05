import "./App.css";
import Footer from "./components/organisms/footer";
import Header from "./components/organisms/header";
import RoutePage from "./routes";

function App() {
  return (
    <div className="App">
      <Header />
      <RoutePage />
      <Footer />
    </div>
  );
}

export default App;
