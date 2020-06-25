import React, { useState } from "react";
import { auth } from "../../firebase/firebase.utils";
import { google_in_user_start } from "../../redux/users/user-actions";
import { connect } from "react-redux";

const SignInGoogle = ({ google_in_user_start }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = ({ email, password }) => {
    console.log("submit called");
  };
  return (
    <div style={{ display: "inline-block" }}>
      <form onSubmit={() => handleSubmit()}>
        <input
          style={{ margin: 5, borderRadius: 8 }}
          name="email"
          type="email"
          value={email}
          lable="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ margin: 5, borderRadius: 8 }}
          type="password"
          name="password"
          value={password}
          label="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="secondary"
          onSubmit={() => handleSubmit({ email, password })}
        >
          Sign In
        </button>
        <button type="button" className="main" onClick={google_in_user_start}>
          Sign In with GOOGLE
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    google_in_user_start: () => dispatch(google_in_user_start()),
  };
};
export default connect(null, mapDispatchToProps)(SignInGoogle);
