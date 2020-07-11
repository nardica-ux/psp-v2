import React, { useState } from "react";
import "./meeting-edit-form.scss";
import { connect } from "react-redux";
import MeetingEditForm from "./meeting-edit-form";

function MeetingDescription({ meetings, meeting_id, num }) {
  const { author, goal, body, platform } = meetings[num];
  const [editMode, setEdit] = useState(false);

  const displayMode = () => (
    <form>
      <fieldset style={{ width: "96%" }}>
        <legend>General info</legend>
        <details>
          <summary>{goal}</summary>

          <p>
            <p>Summary : {body}</p>
            <span>
              Author: <strong>{author} </strong>| Platform:
              <strong>{platform}</strong>
              <button
                style={{ float: "right" }}
                className="secondary"
                onClick={() => setEdit(true)}
              >
                Edit
              </button>
            </span>
          </p>
        </details>
      </fieldset>
    </form>
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
