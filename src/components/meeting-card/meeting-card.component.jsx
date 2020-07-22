import React from "react";
import { connect } from "react-redux";
import "./meeting-card.scss";

import { setMeetingCards } from "../../redux/redux-meetings/meeting-actions";
import "./meeting-card.scss";
import MeetingCardHeader from "./card-header-component";
import TabHeader from "./card-content-tab";
import CardEventsTab from "../event-components/card-event-tab";
import CardActiveContent from "./card-content.component";

// ******************

function MeetingCard({
  id,
  title,
  meetings,
  meeting_num,
  meetingCards,
  activeEvents,
}) {
  return (
    <div className="card">
      <MeetingCardHeader
        title={title}
        meeting_id={id}
        hint={meetings[meeting_num].summary}
      />
      <TabHeader id={id} />
      <CardActiveContent
        meeting_id={id}
        num={meetingCards[id]}
        currentEvent={activeEvents[id]}
      />
      <CardEventsTab meeting_id={id} currentEvent={activeEvents[id]} />
    </div>
  );
}
const mapStateToProps = (state) => ({
  meetingCards: state.meetings.meetingCards,
  activeEvents: state.meetings.activeEvents,
  meetings: state.meetings.meetings,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setMeetingCards: (obj) => dispatch(setMeetingCards(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MeetingCard);
