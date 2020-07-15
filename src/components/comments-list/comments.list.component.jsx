import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./comment-list.scss";
import CommentItem from "./comment-item.component";
import CommentItemAdd from "./comment-add.component";
import { deleteCommentStart } from "../../redux/comments/comments-actions";

const CommentsList = ({
  meeting_id,
  commentsData,
  currentEvent,
  deleteCommentStart,
}) => {
  const [dataComm, setData] = useState(
    commentsData[meeting_id] ? commentsData[meeting_id][currentEvent] : []
  );

  useEffect(() => {
    setData(commentsData[meeting_id][currentEvent]);
  }, [currentEvent, commentsData]);

  return (
    <div>
      {dataComm
        ? dataComm.map((el) => (
            <CommentItem
              key={el.comment_id}
              el={el}
              comment_id={el.comment_id}
              deleteCommentStart={deleteCommentStart}
            />
          ))
        : null}
      <CommentItemAdd meeting_id={meeting_id} event_id={currentEvent} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  commentsData: state.comments.commentsData,
  activeEvents: state.meetings.activeEvents,
});
const mapDispatchToProps = (dispatch) => {
  return {
    deleteCommentStart: (obj) => dispatch(deleteCommentStart(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
