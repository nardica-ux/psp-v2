import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./user-styles.scss";
import { edit_user_start } from "../../redux/users/user-actions";

const UserEditForm = ({ currentUser, edit_user_start }) => {
  const [user, setUser] = useState(currentUser || null);
  const [cancelIt, setCancel] = useState(false);

  if (!currentUser || cancelIt) return <Redirect to="./" />;

  const handleSubmit = (e, obj) => {
    e.preventDefault();
    edit_user_start(obj);
  };

  return (
    <form className="user-edit-form" onSubmit={(e) => handleSubmit(e, user)}>
      <fieldset>
        <h5> Edit the input fields to update your info </h5>
        <legend> {user.displayName} </legend>
        <label htmlFor="displayName">Your name</label>
        <input
          type="text"
          name="displayName"
          value={user.displayName}
          default={user.displayName}
          onChange={(e) => setUser({ ...user, displayName: e.target.value })}
        />

        <label htmlFor="type">Type</label>
        <input
          type="text"
          name="type"
          value={user.type}
          default={user.type}
          onChange={(e) => setUser({ ...user, type: e.target.value })}
        />

        <label htmlFor="email">email</label>
        <input
          type="text"
          name="email"
          value={user.email}
          default={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br />

        <label htmlFor="moto">
          Moto
          <textarea
            type="text"
            name="moto"
            value={user.moto}
            default={user.moto}
            onChange={(e) => setUser({ ...user, moto: e.target.value })}
          />
        </label>
        <br />
        <label htmlFor="about">
          About
          <textarea
            type="text"
            name="about"
            value={user.about}
            default={user.about}
            onChange={(e) => setUser({ ...user, about: e.target.value })}
          />
        </label>
        <br />
        <button
          className="secondary"
          type="button"
          onClick={() => setCancel(true)}
        >
          close
        </button>
        <button className="main" type="submit">
          Update
        </button>
      </fieldset>
    </form>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});
const mapDispatchToProps = (dispatch) => {
  return {
    edit_user_start: (obj) => dispatch(edit_user_start(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditForm);
