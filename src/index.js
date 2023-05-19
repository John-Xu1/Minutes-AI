import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import Chat from "./pages/Chat.js";
import Minutes from "./pages/Minutes.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Minutes />
  </React.StrictMode>
);
