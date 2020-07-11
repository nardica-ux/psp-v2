import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setMeetingCards } from "../../redux/redux-meetings/meeting-actions";
import "./meeting-card.scss";
import MeetingDescription from "./meeting-descr.component";
import CommentsList from "../comments-list/comments.list.component";
import TabHeader from "./card-content-tab";
import EvalutionBlock from "../evaluations-list/evaluations-list.component";
import CardEventsTab from "../event-components/card-event-tab";

// ******************

function MeetingCard({
  id,
  title,
  setMeetingCards,
  meetingCards,
  num,
  activeEvents,
}) {
  const [activeTab, setActiveTab] = useState(meetingCards[id]);
  const handleTab = (num) => {
    setActiveTab(num);
    setMeetingCards({ id, num });
  };

  const tabContent = (tab) => {
    switch (tab) {
      default:
        break;
      case 0:
        return <MeetingDescription meeting_id={id} num={num} />;
      case 1:
        return <CommentsList meeting_id={id} />;
      case 2:
        return <EvalutionBlock meeting_id={id} />;
    }
  };
  return (
    <div className="card">
      <TabHeader tab={activeTab} handleTab={handleTab} id={id} />
      <Link
        className="title"
        style={{ color: "slateblue", float: "right" }}
        to={`meeting/${id}`}
      >
        {title}
      </Link>
      <CardEventsTab
        meeting_id={id}
        currentEvent={activeEvents[id]}
        num={num}
      />
      {tabContent(activeTab)}
    </div>
  );
}
const mapStateToProps = (state) => ({
  meetingCards: state.meetings.meetingCards,
  activeEvents: state.meetings.activeEvents,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setMeetingCards: (obj) => dispatch(setMeetingCards(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MeetingCard);
