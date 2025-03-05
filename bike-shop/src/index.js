import "./css/index.css";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import ConfigProvider from "./contexts/ConfigContext";
import InternalApp from "./Internal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/internal" element={<InternalApp />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
