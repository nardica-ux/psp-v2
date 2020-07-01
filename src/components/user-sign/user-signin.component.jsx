import React, { useState } from "react";
import {
  google_in_user_start,
  email_user_start,
  signup_user_start,
} from "../../redux/users/user-actions";
import { connect } from "react-redux";
import "./user-sign.styles.scss";

const SignInGoogle = ({
  google_in_user_start,
  email_user_start,
  signup_user_start,
}) => {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setName] = useState("enter your name");

  const handleSubmitSignIn = async (e, { email, password, displayName }) => {
    e.preventDefault();
    email_user_start({ email, password, displayName });
  };

  const handleSubmitSignUp = async (e, { email, password, displayName }) => {
    e.preventDefault();
    signup_user_start({ email, password, displayName });
  };

  const signINform = () => (
    <form
      onSubmit={(e) => handleSubmitSignIn(e, { email, password, displayName })}
    >
      <label htmlFor="email">Email</label>
      <input
        className="input-style"
        name="email"
        type="email"
        value={email}
        label="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        className="input-style"
        type="password"
        name="password"
        value={password}
        label="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit" className="secondary">
        Sign In
      </button>

      <button type="button" className="main" onClick={google_in_user_start}>
        Sign In with GOOGLE
      </button>
    </form>
  );
  const signUPform = () => (
    <form
      onSubmit={(e) => handleSubmitSignUp(e, { email, password, displayName })}
    >
      <input
        style={{ margin: 5, borderRadius: 8 }}
        name="name"
        type="name"
        value={displayName}
        label="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        style={{ margin: 5, borderRadius: 8 }}
        name="email"
        type="email"
        value={email}
        label="email"
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
      <input
        style={{ margin: 5, borderRadius: 8 }}
        type="password"
        name="password"
        value={password}
        label="repeat password"
        placeholder="repeat password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="secondary" onClick={signup_user_start}>
        Sign UP
      </button>
    </form>
  );

  return (
    <div className="signinup-container">
      <button
        className="main"
        onClick={() => {
          setSignIn(!signIn);
          setSignUp(false);
        }}
      >
        {signIn ? "Close" : "SignIN"}
      </button>
      <button
        className="main"
        onClick={() => {
          setSignUp(!signUp);
          setSignIn(false);
        }}
      >
        {signUp ? "Close" : "SignUP"}
      </button>
      <dialog open={signIn} className="pop-up-sign">
        {signIn ? signINform() : null}
      </dialog>
      <dialog open={signUp} className="pop-up-sign">
        {signUp ? signUPform() : null}
      </dialog>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    google_in_user_start: () => dispatch(google_in_user_start()),
    email_user_start: (obj) => dispatch(email_user_start(obj)),
    signup_user_start: (obj) => dispatch(signup_user_start(obj)),
  };
};
export default connect(null, mapDispatchToProps)(SignInGoogle);
