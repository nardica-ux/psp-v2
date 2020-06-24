import React from "react";

function MeetingDescription({ data }) {
  const { author, goal, body, platform } = data;
  return (
    <div>
      <div>
        Author: <strong>{author} </strong>| Platform:{" "}
        <strong>{platform}</strong>
      </div>
      <h3>Goal</h3>
      <p style={{ textAlign: "left" }}>{goal}</p>
      <h3>Summary</h3>
      <p style={{ textAlign: "left" }}>{body}</p>
    </div>
  );
}
export default MeetingDescription;
