import React, { useState } from "react";
import { connect } from "react-redux";
import { edit_user_start } from "../../redux/users/user-actions";

const UserBio = ({ about, id, edit_user_start }) => {
  const [editing, setMode] = useState(false);
  const [newAbout, setAbout] = useState(about);

  const handleSubmit = (e, obj) => {
    e.preventDefault();
    edit_user_start(obj);
    setMode(false);
  };

  const editBlock = (
    <form
      className="user-edit-form"
      onSubmit={(e) => handleSubmit(e, { about: newAbout, id })}
    >
      <textarea
        type="text"
        name="about"
        value={newAbout}
        onChange={(e) => setAbout(e.target.value)}
      />
      <button className={"main"} style={{ float: "right" }}>
        Update
      </button>
    </form>
  );

  return (
    <div className="user-about">
      <h3>About me</h3>
      {editing ? editBlock : about}
      <button className="secondary" onClick={() => setMode(!editing)}>
        {editing ? "Close" : "Edit"}
      </button>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    edit_user_start: (obj) => dispatch(edit_user_start(obj)),
  };
};
export default connect(null, mapDispatchToProps)(UserBio);
