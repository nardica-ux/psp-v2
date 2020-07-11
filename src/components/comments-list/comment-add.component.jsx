import React, { useState } from "react";
import { connect } from "react-redux";
import "./comment-list.scss";

import { addNewCommentStart } from "../../redux/comments/comments-actions";

function CommentItemAdd({
  addNewCommentStart,
  meeting_id,
  currentUser,
  activeEvents,
}) {
  const [body, setValue] = useState("");

  // if (value.lenth < 10 && value.split(" ").length < 4) {
  //   alert("please elaborate a bit more");
  //   return}
  let user_name = currentUser.displayName;
  let user_id = currentUser.id;
  let event_date = activeEvents[meeting_id];

  return (
    <form className="form-comment-add">
      <input
        type="text"
        placeholder="add your item"
        value={body}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        className="main"
        type="button"
        onClick={() =>
          addNewCommentStart({
            body,
            meeting_id,
            user_id,
            event_date,
            user_name,
          })
        }
      >
        Add
      </button>
    </form>
  );
}
const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
  activeEvents: state.meetings.activeEvents,
});
const mapDispatchToProps = (dispatch) => {
  return {
    addNewCommentStart: (el) => dispatch(addNewCommentStart(el)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentItemAdd);
