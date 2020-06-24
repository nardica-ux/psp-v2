import React, { useState } from "react";
import "./meeting-edit-form.scss";

function MeetingDescription({ data }) {
  const [editMode, setEdit] = useState(false);
  const { author, goal, body, platform } = data;

  const editForm = () => (
    <div>
      <span>
        Author: <input className="meeting-edit" type="text" value={author} />
      </span>
      <span>
        Platform:{" "}
        <input className="meeting-edit" type="text" value={platform} />
      </span>
      <h3>Goal</h3>
      <textarea
        name="goal"
        className="meeting-edit long"
        value={body}
        // rows="5"
        // cols="50"
        wrap="soft"
        // maxlength="200"
        value={goal}
      />
      <h3>Summary</h3>
      <textarea
        name="text"
        className="meeting-edit long"
        value={body}
        // rows="5"
        // cols="50"
        wrap="soft"
        // maxlength="200"
      />
      <div style={{ display: "flex" }}>
        <button className="main" onClick={() => setEdit(false)}>
          Save{" "}
        </button>
      </div>
    </div>
  );

  const displayMode = () => (
    <div>
      <div>
        Author: <strong>{author} </strong>| Platform:{" "}
        <strong>{platform}</strong>
      </div>
      <h3>Goal</h3>
      <p style={{ textAlign: "left" }}>{goal}</p>
      <h3>Summary</h3>
      <p style={{ textAlign: "left" }}>{body}</p>
      <div style={{ display: "flex" }}>
        <button className="secondary">Delete </button>
        <button className="main" onClick={() => setEdit(true)}>
          Edit{" "}
        </button>
      </div>
    </div>
  );
  return editMode ? editForm() : displayMode();
}
export default MeetingDescription;
