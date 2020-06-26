import React from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./app-header.scss";
import SignInGoogle from "../user-sign/user-signin.component";
import UserTopBlock from "../user-components/user-top-block";

const AppHeader = ({ currentUser }) => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>PSP v2.0</p>
    {currentUser ? (
      <UserTopBlock currentUser={currentUser} />
    ) : (
      <SignInGoogle />
    )}
  </header>
);

const mapstatetoProps = (state) => ({
  currentUser: state.users.currentUser,
});
export default connect(mapstatetoProps)(AppHeader);
