import React, { useState } from "react";
import { connect } from "react-redux";
import { edit_user_start } from "../../redux/users/user-actions";

const UserMoto = ({ moto, edit_user_start, id }) => {
  const [editing, setMode] = useState(false);
  const [newMoto, setMoto] = useState(moto);

  const handleSubmit = (e, obj) => {
    e.preventDefault();
    edit_user_start(obj);
    setMode(false);
  };

  const editBlock = (
    <form
      className="user-edit-form"
      onSubmit={(e) => handleSubmit(e, { moto: newMoto, id })}
    >
      <textarea
        type="text"
        name=""
        value={newMoto}
        onChange={(e) => setMoto(e.target.value)}
      />
      <button className="main" type="submit" style={{ float: "right" }}>
        Update
      </button>
    </form>
  );
  return (
    <div className="user-about">
      <h3>My Moto</h3>
      {editing ? editBlock : moto}
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

export default connect(null, mapDispatchToProps)(UserMoto);
