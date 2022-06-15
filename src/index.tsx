import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./style/index.css";
import "./FontAwesome";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
