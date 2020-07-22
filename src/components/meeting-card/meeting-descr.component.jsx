import React, { useState } from "react";
import "./meeting-edit-form.scss";
import { connect } from "react-redux";
import MeetingEditForm from "./meeting-edit-form";

function MeetingDescription({ meetings, meeting_id, num }) {
  const data = meetings.find((el) => el.meeting_id === meeting_id);
  const { author, goal, body, platform } = data;
  const [editMode, setEdit] = useState(false);

  const displayMode = () => (
    <div style={{ textAlign: "left" }}>
      <p>
        <strong>Goal: </strong>
        {goal}
      </p>

      <p>
        <strong>Summary: </strong>
        {body}
      </p>
      <p>
        <span>
          Author: <strong>{author} </strong>| Platform:
          <strong>{platform}</strong>
        </span>
      </p>
    </div>
  );
  return editMode ? (
    <MeetingEditForm
      data={meetings[num]}
      setEdit={setEdit}
      meeting_id={meeting_id}
    />
  ) : (
    displayMode()
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
  meetings: state.meetings.meetings,
});

export default connect(mapStateToProps)(MeetingDescription);
