import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";

// @ts-ignore
const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
