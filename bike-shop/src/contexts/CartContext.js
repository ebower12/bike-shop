import React, { createContext, useReducer, useEffect } from "react";
import cartReducer, { initialState } from "../reducers/cartReducer";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(
    cartReducer,
    initialState,
    () => {
      const localData = localStorage.getItem("cartState");
      return localData ? JSON.parse(localData) : initialState;
    }
  );

  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(cartState));
  }, [cartState]);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
