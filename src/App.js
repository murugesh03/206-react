import { useState } from "react";
import "./App.css";
import Home from "./components/home";
import logo from "./logo.svg";
function App() {
  const [state, setState] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Home />
        <button onClick={() => setState("updated")}>Update</button>
      </header>
    </div>
  );
}

export default App;
