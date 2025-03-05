import "./css/App.css";
import { useReducer } from "react";
import Button from "react-bootstrap/Button";
import NavBar from "./components/nav-bar";
import ConfigurationBar from "./components/configuration-bar";
import cartReducer, { initialState } from "./reducers/cartReducer";

function App() {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

  function addItemToCartState(newItem) {
    cartDispatch({
      type: "update",
      cartItems: [...cartState.cartItems, newItem],
    });
  }

  return (
    <div className="App">
      <NavBar />
      <Button>{`Cart ${cartState.cartItems.length}`}</Button>
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
