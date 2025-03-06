import "./css/App.css";
import { useContext } from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import NavBar from "./components/nav-bar";
import ConfigurationBar from "./components/configuration-bar";
import { CartContext } from "./contexts/CartContext";

function App() {
  const { cartState, cartDispatch } = useContext(CartContext);
  const navigate = useNavigate();

  function addItemToCartState(newItem) {
    cartDispatch({
      type: "update",
      cartItems: [...cartState.cartItems, newItem],
    });
  }

  return (
    <div className="App">
      <NavBar />
      <Button variant="success" onClick={() => navigate("/cart")}>
        {`Cart ${cartState.cartItems.length}`}
      </Button>
      <header className="App-header">
        <ConfigurationBar
          cartState={cartState}
          addItemToCartState={(item) => addItemToCartState(item)}
        />
      </header>
    </div>
  );
}

export default App;
