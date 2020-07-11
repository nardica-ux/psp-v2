import React, { useState } from "react";
import "./comment-list.scss";
import { connect } from "react-redux";

import {
  deleteCommentFromRedux,
  voteCommentInRedux,
} from "../../redux/comments/comments-actions";
import {
  deleteCommentFromFirebase,
  voteMeetingComment,
} from "../../firebase/firebase-comments";

const CommentItem = ({
  el,
  meeting_id,
  id,
  handleDel,
  deleteCommentFromRedux,
  voteCommentInRedux,
  currentEvent,
}) => {
  const [vote, setVotes] = useState(el.vote_count);
  const handleDelComment = async (id) => {
    let okDel = await deleteCommentFromFirebase(id);
    if (okDel) {
      deleteCommentFromRedux({ id, meeting_id });
      handleDel();
    }
  };
  const handleVote = async (num) => {
    let upd = await voteMeetingComment(num, id);
    if (upd) {
      voteCommentInRedux({ vote, id, meeting_id });
      setVotes(vote + num);
    }
  };
  let nameInitials = "XYZ";
  if (el.displayName) {
    nameInitials = el.displayName.split(" ")[0];
    nameInitials = nameInitials.join("");
  }

  return (
    <div className="comment-item">
      <div className="comment-avatar">{nameInitials}</div>

      <div key={id} className="comment-body">
        <div style={{ float: "left" }}>
          <div className="comment-vote">{vote || "0"}</div>
          <div className="comment-vote" onClick={(e) => handleDelComment(id)}>
            Del
          </div>
        </div>
        <div className="comment-text">{el.body}</div>

        <div>
          <div className="comment-vote" onClick={() => handleVote(1)}>
            +1
          </div>

          <div className="comment-vote" onClick={() => handleVote(-1)}>
            -1
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteCommentFromRedux: (obj) => dispatch(deleteCommentFromRedux(obj)),
    voteCommentInRedux: (obj) => dispatch(voteCommentInRedux(obj)),
  };
};

export default connect(null, mapDispatchToProps)(CommentItem);
