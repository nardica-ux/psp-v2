import React, { useState } from "react";
import { connect } from "react-redux";
import "./comment-list.scss";
import CommentItem from "./comment-item.component";
import CommentItemAdd from "./comment-add.component";
import CommentTab from "./comment-tab.component";
import CommentEventsTab from "./comments-event-tab";

const CommentsList = ({ meeting_id, comments, past_events }) => {
  const data = [...comments.commentsData[meeting_id]];

  const [dataComm, setData] = useState(data);

  const handleAddNews = (el) => setData([...dataComm, el]);

  const handleDel = () => {
    let update = [...comments.commentsData[meeting_id]];
    setData([...update]);
  };

  const handleSort = (num) => {
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
  const switchEvent = (num) => {
    console.log(num);
  };
  return (
    <div>
      <CommentEventsTab
        switchEvent={switchEvent}
        meeting_id={meeting_id}
        past_events={past_events}
      />
      <CommentTab handleSort={handleSort} />
      {dataComm.length
        ? dataComm.map((el, i) => (
            <CommentItem
              el={el}
              id={el.comment_id}
              meeting_id={meeting_id}
              key={meeting_id + i}
              handleDel={handleDel}
            />
          ))
        : null}
      <CommentItemAdd meeting_id={meeting_id} handleAddNews={handleAddNews} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  comments: state.comments,
});

export default connect(mapStateToProps)(CommentsList);
