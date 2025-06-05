import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Ou './styles/global.css' se preferir importar aqui

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
