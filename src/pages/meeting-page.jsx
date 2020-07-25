import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../components/app/App.scss";
import "./meeting-page-style.scss";
import EvalutionBlock from "../components/evaluations-list/evaluations-list.component";
import CommentsList from "../components/comments-list/comments.list.component";

import MeetingDescription from "../components/meeting-card/meeting-descr.component";
import AddEvent from "../components/event-components/event-add.component";
import MeetingAllEvents from "../components/event-components/event-fullinfo-component";

const MeetingPage = (props) => {
  const { activeEvents, meetings, eventsData } = props;

  const { meeting_id } = props.match.params;
  const meetingData = meetings.find((el) => el.meeting_id === meeting_id);
  const { title, author, goal, summary, platform } = meetingData;
  const event_id = activeEvents[meeting_id];
  const selectedEventDate = "";
  if (eventsData[meeting_id][event_id])
    new Date(eventsData[meeting_id][event_id].stamp).toLocaleString();
  if (!meetings || !meeting_id) return null;

  return (
    <div>
      <h2 className="title">GROUP: {title}</h2>
      <div className="page-flex">
        <div className="page-block">
          <h4>Events Description</h4>
          <MeetingDescription meeting_id={meeting_id} />
        </div>

        <div className="page-block">
          <div className="page-flex">
            <h4 style={{ marginRight: 50 }}>Events </h4>
            <AddEvent meeting_id={meeting_id} />
          </div>
          <MeetingAllEvents
            meeting_id={meeting_id}
            eventsData={eventsData[meeting_id]}
            currentEvent={event_id}
          />
        </div>
      </div>

      <div className="page-flex">
        <div className="page-block">
          <h4>Comments for Event on {selectedEventDate}</h4>
          <CommentsList meeting_id={meeting_id} currentEvent={event_id} />;
        </div>

        <div className="page-block">
          <h4>Evaluations for {selectedEventDate}</h4>
          <EvalutionBlock meeting_id={meeting_id} currentEvent={event_id} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
  activeEvents: state.meetings.activeEvents,
  meetings: state.meetings.meetings,
  eventsData: state.events.eventsData,
});

export default withRouter(connect(mapStateToProps)(MeetingPage));
