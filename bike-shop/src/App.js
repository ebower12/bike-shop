import "./css/App.css";
import NavBar from "./components/nav-bar";
import ConfigurationBar from "./components/configuration-bar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <ConfigurationBar />
      </header>
    </div>
  );
}

export default App;
