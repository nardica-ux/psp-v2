import React, { useState } from "react";
import { connect } from "react-redux";
import "./comment-list.scss";

import { addNewCommentRedux } from "../../redux/comments/comments-actions";
import { CommentAddToFirebase } from "../../firebase/firebase-comments";

function CommentItemAdd({
  addNewCommentRedux,
  meeting_id,
  currentUser,
  handleAddNews,
}) {
  const [value, setValue] = useState("");
  const handleAdd = async () => {
    // if (value.lenth < 10 && value.split(" ").length < 4) {
    //   alert("please elaborate a bit more");
    //   return;
    // }
    //add to database
    let newComment = await CommentAddToFirebase(value, meeting_id);

    if (newComment) {
      console.log(newComment);
      //if Ok add to Redux
      addNewCommentRedux(newComment);
      // callback to parent to update this list of comments
      handleAddNews(newComment);
    }
  };

  return (
    <form className="form-comment-add">
      <input
        type="text"
        placeholder="add your item"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button className="main" type="button" onClick={() => handleAdd()}>
        Add
      </button>
    </form>
  );
}
const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});
const mapDispatchToProps = (dispatch) => {
  return {
    addNewCommentRedux: (el) => dispatch(addNewCommentRedux(el)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentItemAdd);
