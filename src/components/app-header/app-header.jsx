import React from "react";
import { connect } from "react-redux";
import logo from "./logo512.png";
import { Link } from "react-router-dom";
import "./app-header.scss";
import SignInGoogle from "../user-sign/user-signin.component";
import UserTopBlock from "../user-components/user-top-block";

const AppHeader = ({ currentUser }) => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <Link to="/" style={{ marginRight: "auto" }}>
      Participation Support Platform v2.0
    </Link>
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
