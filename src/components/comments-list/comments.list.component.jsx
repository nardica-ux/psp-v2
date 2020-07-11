import React, { useState } from "react";
import { connect } from "react-redux";
import "./comment-list.scss";
import CommentItem from "./comment-item.component";
import CommentItemAdd from "./comment-add.component";
import CommentTab from "./comment-tab.component";

const CommentsList = ({
  meeting_id,
  commentsData,
  activeEvents,
}) => {
  const currentEvent = `${meeting_id}%%${activeEvents[meeting_id]}`;
  const [dataComm, setData] = useState(commentsData[meeting_id] || null);

  const handleDel = () => {
    let update = [...commentsData[meeting_id]];
    setData([...update]);
  };

  const handleSort = (num) => {
    let data = [];
    if (commentsData) data = commentsData[meeting_id][currentEvent];
    switch (num) {
      case 0:
        {
          let sorted1 = [...data];
          setData([...sorted1.splice(0, 3)]);
        }
        break;
      case 1:
        {
          let sorted2 = [...data];
          sorted2.sort((a, b) => b.vote_count - a.vote_count);
          setData([...sorted2.slice(0, 3)]);
        }
        break;
      case 2:
        setData([...data]);
    }
  };

  return (
    <div>
      {/* <CommentTab handleSort={handleSort} /> */}
      {dataComm && dataComm[currentEvent]
        ? dataComm[currentEvent].map((el, i) => (
            <CommentItem
              el={el}
              id={el.comment_id}
              meeting_id={meeting_id}
              key={meeting_id + i}
              handleDel={handleDel}
              currentEvent={currentEvent}
            />
          ))
        : null}
      <CommentItemAdd meeting_id={meeting_id} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  commentsData: state.comments.commentsData,
  activeEvents: state.meetings.activeEvents,
});

export default connect(mapStateToProps)(CommentsList);
