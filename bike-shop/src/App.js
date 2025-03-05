import "./css/App.css";
import { useContext } from "react";
import { NavLink } from "react-router";
import Button from "react-bootstrap/Button";
import NavBar from "./components/nav-bar";
import ConfigurationBar from "./components/configuration-bar";
import { CartContext } from "./contexts/CartContext";

function App() {
  const { cartState, cartDispatch } = useContext(CartContext);

  function addItemToCartState(newItem) {
    cartDispatch({
      type: "update",
      cartItems: [...cartState.cartItems, newItem],
    });
  }

  return (
    <div className="App">
      <NavBar />
      <Button>
        <NavLink to="/cart">{`Cart ${cartState.cartItems.length}`}</NavLink>
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
