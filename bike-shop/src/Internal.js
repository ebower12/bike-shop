import "./css/internal.css";
import NavBar from "./components/nav-bar";

function InternalApp() {
  return (
    <div>
      <NavBar />
      <header className="internal-page">
        THIS IS THE INTERNAL MANAGEMENT PAGE
      </header>
    </div>
  );
}

export default InternalApp;
