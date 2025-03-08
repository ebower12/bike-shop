import "./css/App.css";
import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import NavBar from "./components/nav-bar";
import BikesView from "./components/bikes-view";
import ConfigurationBar from "./components/configuration-bar";
import cartReducer, { initialCartState } from "./reducers/cartReducer";
import configReducer, { initialConfigState } from "./reducers/configReducer";
import { getCart, updateCart } from "./Router";

function App() {
  const [configState] = useReducer(configReducer, initialConfigState);
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await getCart();

      cartDispatch({
        type: "update",
        cartItems: result.cartItems,
      });
    }

    fetchData();
  }, []);

  const addItemToCart = (newItem) => {
    async function updateData() {
      const newCart = {
        cartItems: [...cartState.cartItems, newItem],
      };
      const result = await updateCart(newCart);
      cartDispatch({
        type: "update",
        cartItems: result.cartItems,
      });
    }

    updateData();
  };

  return (
    <div className="App">
      <NavBar />
      <Button
        size="lg"
        variant="success"
        style={{ float: "right", marginRight: "2%" }}
        onClick={() => navigate("/cart")}
      >
        {`Cart ${cartState.cartItems.length}`}
      </Button>
      <header className="App-header">
        <ConfigurationBar
          cartState={cartState}
          addItemToCart={(item) => addItemToCart(item)}
        />
        <BikesView
          internal={false}
          addItemToCart={(item) => addItemToCart(item)}
          availableOptions={configState.availableOptions}
        />
      </header>
    </div>
  );
}

export default App;
