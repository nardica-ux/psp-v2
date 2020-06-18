import React from "react";
import logo from "./logo.svg";
import "./app-header.scss";

const AppHeader = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>PSP v2.0</p>
  </header>
);

export default AppHeader;
