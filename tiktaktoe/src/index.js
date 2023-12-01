import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Arrays from "./Arrays";
import Events from "./Events";
import UpdatingScreen from "./UpdatingScreen";
import SharingData from "./SharingData";
import reportWebVitals from "./reportWebVitals";
import Tiktaktoe from "./Tiktaktoe";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Tiktaktoe />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
