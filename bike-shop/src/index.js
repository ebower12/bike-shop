import "./css/index.css";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import ConfigProvider from "./contexts/ConfigContext";
import CartProvider from "./contexts/CartContext";
import InternalApp from "./Internal";
import CartApp from "./Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <CartProvider>
      <ConfigProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/internal" element={<InternalApp />} />
            <Route path="/cart" element={<CartApp />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </CartProvider>
  </StrictMode>
);
