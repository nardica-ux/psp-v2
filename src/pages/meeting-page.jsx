import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import EvalutionBlock from "../components/evaluations-list/evaluations-list.component";
import CommentsList from "../components/comments-list/comments.list.component";
import EventsListAll from "../components/event-components/events-list-all";

const MeetingPage = (props) => {
  const { activeEvents, meetings } = props;

  const { meeting_id } = props.match.params;
  const meetingData = meetings.find((el) => el.meeting_id === meeting_id);
  const { title, author, goal, summary, platform } = meetingData;
  const event_id = activeEvents[meeting_id];

  if (!meetings || !meeting_id) return null;

  return (
    <div>
      <h2 className="title">{title}</h2>
      <div
        style={{
          width: "92%",
          backgroundColor: "white",
          margin: "3%",
          padding: 16,
          borderRadius: 16,
        }}
      >
        <span>
          <strong>Author:</strong> {author}
        </span>
        <span>
          <strong>Platform:</strong> {platform}
        </span>
        <div style={{ margin: 12 }}>
          <strong>Goal: </strong>

          {goal}
        </div>
        <div style={{ margin: 12 }}>
          <strong>Summary:</strong> {summary}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "auto",
          width: "96%",
          justifyContent: "center",
          alignItems: "baseline",
        }}
      >
        <div
          style={{
            width: "30%",
            backgroundColor: "white",
            padding: 16,
            margin: 12,
            borderRadius: 16,
          }}
        >
          <h4>Events List</h4>
          <EventsListAll meeting_id={meeting_id} />
        </div>
        <div
          style={{
            width: "30%",
            backgroundColor: "white",
            padding: 16,
            margin: 12,
            borderRadius: 16,
          }}
        >
          <h4>Comment List</h4>
          <CommentsList meeting_id={meeting_id} event_id={event_id} />;
        </div>
        <div
          style={{
            width: "30%",
            backgroundColor: "white",
            padding: 16,
            borderRadius: 16,
          }}
        >
          <h4>Evaluation List</h4>
          <EvalutionBlock
            meeting_id={meeting_id}
            currentEvent={activeEvents[meeting_id]}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
  activeEvents: state.meetings.activeEvents,
  meetings: state.meetings.meetings,
});

export default withRouter(connect(mapStateToProps)(MeetingPage));
