import "./css/cart.css";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import NavBar from "./components/nav-bar";
import { CartContext } from "./contexts/CartContext";

function CartApp() {
  const { cartState, cartDispatch } = useContext(CartContext);

  function removeItemFromCart(item) {
    cartDispatch({
      type: "update",
      cartItems: cartState.cartItems.filter((cartItem) => cartItem !== item),
    });
  }

  return (
    <div className="cart-page">
      <NavBar />
      <h1>Cart</h1>
      <ul>
        {cartState.cartItems.map((item) => (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <li key={item.id}>{JSON.stringify(item)}</li>
            <Button onClick={() => removeItemFromCart(item)}>Remove</Button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default CartApp;
