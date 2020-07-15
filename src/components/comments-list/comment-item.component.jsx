import React from "react";
import "./comment-list.scss";
import { connect } from "react-redux";

import { voteCommentStart } from "../../redux/comments/comments-actions";

const CommentItem = ({
  el,
  comment_id,
  deleteCommentStart,
  voteCommentStart,
}) => {
  // const [vote, setVotes] = useState(el.vote_count);

  let nameInitials = "XYZ";
  if (el.user_name) {
    let nameInit = el.user_name.split(" ");
    nameInitials = nameInit.map((el) => el.split("")[0]);
    nameInitials = nameInitials.join("");
  }

  return (
    <div className="comment-item">
      <div className="comment-avatar">{nameInitials}</div>

      <div key={comment_id} className="comment-body">
        <div style={{ float: "left" }}>
          <div className="comment-vote">{el.vote_count || "0"}</div>
          <div
            className="comment-vote"
            onClick={() => deleteCommentStart({ id: comment_id })}
          >
            Del
          </div>
        </div>
        <div className="comment-text">
          {el.body} + evID :{el.comment_id} for commID: {el.event_id}
        </div>

        <div>
          <div
            className="comment-vote"
            onClick={() => voteCommentStart({ comment_id, vote: 1 })}
          >
            +1
          </div>

          <div
            className="comment-vote"
            onClick={() => voteCommentStart({ comment_id, vote: -1 })}
          >
            -1
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  // currentUser: state.users.currentUser,
});
const mapDispatchToProps = (dispatch) => {
  return {
    voteCommentStart: (obj) => dispatch(voteCommentStart(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
