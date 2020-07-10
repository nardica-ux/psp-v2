import React, { useState } from "react";
import "./meeting-edit-form.scss";
import { connect } from "react-redux";

import { update_meeting_start } from "../../redux/redux-meetings/meeting-actions";

function MeetingDescription({ data, update_meeting_start, meeting_id, index }) {
  const { author, goal, body, platform, past_events } = data;
  const [editMode, setEdit] = useState(false);

  const [newGoal, setGoal] = useState(goal);
  const [newSummary, setSummary] = useState(body);
  const [newAuthor, setAuthor] = useState(author);
  const [newPlatform, setPlatform] = useState(platform);
  const [update, setUpdate] = useState(0);
  const [defineEvent, setEvent] = useState({
    date: null,
    time: null,
    zone: "PM",
  });

  const editForm = () => (
    <div>
      <span>
        Author:
        <input
          className="meeting-edit"
          type="text"
          value={newAuthor}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </span>
      <span>
        Platform:
        <input
          className="meeting-edit"
          type="text"
          value={newPlatform}
          onChange={(e) => setPlatform(e.target.value)}
        />
      </span>
      <h3>Goal</h3>
      <textarea
        name="goal"
        className="meeting-edit long"
        value={newGoal}
        wrap="soft"
        onChange={(e) => setGoal(e.target.value)}
      />
      <h3>Summary</h3>
      <textarea
        name="text"
        className="meeting-edit long"
        value={newSummary}
        wrap="soft"
        onChange={(e) => setSummary(e.target.value)}
      />
      <div style={{ display: "flex" }}>
        <button
          type="button"
          className="secondary"
          onClick={() => setEdit(false)}
        >
          Close
        </button>
        <button
          className="main"
          type="button"
          onClick={() => {
            update_meeting_start({
              meeting_id,
              author: newAuthor,
              goal: newGoal,
              body: newSummary,
              platform: newPlatform,
            });
            setEdit(false);
            setUpdate(update + 1);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );

  const displayMode = () => (
    <div>
      <div>
        Author: <strong>{author} </strong>| Platform:
        <strong>{platform}</strong>
      </div>
      <h3>Goal</h3>
      <p style={{ textAlign: "left" }}>{goal}</p>
      <h3>Summary</h3>
      <p style={{ textAlign: "left" }}>{body}</p>

      <h3>Past and Upcoming events</h3>
      <p style={{ textAlign: "left" }}>
        {past_events ? past_events.map((el) => `${el} /  `) : null}
      </p>
      <div style={{ display: "flex" }}>
        <input
          type="date"
          value={defineEvent.date}
          onChange={(e) => setEvent({ ...defineEvent, date: e.target.value })}
        />
        <input
          type="time"
          value={defineEvent.time}
          onChange={(e) => setEvent({ ...defineEvent, time: e.target.value })}
        />
        <select
          type="time"
          value={defineEvent.zone}
          onChange={(e) => setEvent({ ...defineEvent, zone: e.target.value })}
        >
          <option value={"AM"}>AM</option>
          <option value={"PM"}>PM</option>
        </select>
        <button
          className="secondary"
          onClick={() => {
            update_meeting_start({
              meeting_id,
              defineEvent,
            });
          }}
        >
          Add Past Event
        </button>

        <button className="main" onClick={() => setEdit(true)}>
          Edit
        </button>
      </div>
    </div>
  );
  return editMode ? editForm() : displayMode();
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    update_meeting_start: (obj) => dispatch(update_meeting_start(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MeetingDescription);
