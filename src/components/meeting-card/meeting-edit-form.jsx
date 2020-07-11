import React, { useState } from "react";
import { connect } from "react-redux";
import { update_meeting_start } from "../../redux/redux-meetings/meeting-actions";

const MeetingEditForm = ({
  data,
  meeting_id,
  setEdit,
  update_meeting_start,
}) => {
  const { author, goal, body, platform, title } = data;
  const [newTitle, setTitle] = useState(title);
  const [newGoal, setGoal] = useState(goal);
  const [newSummary, setSummary] = useState(body);
  const [newAuthor, setAuthor] = useState(author);
  const [newPlatform, setPlatform] = useState(platform);
  const [update, setUpdate] = useState(0);
  return (
    <form>
      Title:
      <input
        style={{ width: "90%" }}
        className="meeting-edit"
        type="text"
        value={newTitle}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <span>
        Author:
        <input
          className="meeting-edit"
          type="text"
          value={newAuthor}
          onChange={(e) => setAuthor(e.target.value)}
        />
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
        rows="6"
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
              title: newTitle,
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
    </form>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    update_meeting_start: (obj) => dispatch(update_meeting_start(obj)),
  };
};
export default connect(null, mapDispatchToProps)(MeetingEditForm);
