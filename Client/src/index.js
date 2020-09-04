import React from "react";
import ReactDOM from "react-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ReactNotification />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
