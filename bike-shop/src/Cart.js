import "./css/cart.css";
import { useReducer, useEffect } from "react";
import Button from "react-bootstrap/Button";
import NavBar from "./components/nav-bar";
import cartReducer, { initialCartState } from "./reducers/cartReducer";
import { getCart, updateCart } from "./Router";

function CartApp() {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

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

  const removeItemFromCart = (item) => {
    async function updateData() {
      const newCart = {
        cartItems: cartState.cartItems.filter((cartItem) => cartItem !== item),
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
    <div className="cart-page">
      <NavBar />
      <h1>Cart</h1>
      <ul style={{ listStyleType: "none" }}>
        {cartState.cartItems.map((item) => (
          <div
            key={item.id}
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
            <li>{Object.values(item.parts).join(", ")}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default CartApp;
