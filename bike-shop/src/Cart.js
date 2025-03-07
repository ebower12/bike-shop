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
      <ul style={{ listStyleType: "none" }}>
        {cartState.cartItems.map((item) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => removeItemFromCart(item)}
            >
              Remove
            </Button>
            <li key={item.id}>{Object.values(item.parts).join(", ")}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default CartApp;
