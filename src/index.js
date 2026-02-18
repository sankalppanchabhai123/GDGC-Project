import React from "react";
import { createRoot } from 'react-dom/client';
// import createRoot
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContexts";

const root = createRoot(document.getElementById("root"));


root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
