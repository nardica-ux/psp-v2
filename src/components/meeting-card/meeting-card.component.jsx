import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./meeting-card.scss";

import { setMeetingCards } from "../../redux/redux-meetings/meeting-actions";
import "./meeting-card.scss";

import TabHeader from "./card-content-tab";
import CardEventsTab from "../event-components/card-event-tab";
import CardActiveContent from "./card-content.component";

// ******************

function MeetingCard({ id, title, meetingCards, meeting_num, activeEvents }) {
  return (
    <div className="card">
      <Link className="title" to={`/meeting/${id}`}>
        {title}
      </Link>
      <TabHeader id={id} />

      <CardEventsTab meeting_id={id} currentEvent={activeEvents[id]} />

      <CardActiveContent
        activeTab={meetingCards[id]}
        meeting_id={id}
        num={meetingCards[id]}
        currentEvent={activeEvents[id]}
      />
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
