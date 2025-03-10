import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import InternalApp from "./Internal";
import CartApp from "./Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/internal" element={<InternalApp />} />
        <Route path="/cart" element={<CartApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
