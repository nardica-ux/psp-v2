import React from "react";

function MeetingDescription({ data }) {
  console.log(data);
  const { author, goal, body, platform } = data;
  return (
    <dl>
      <dt>Author</dt>
      <dd>{author}</dd>
      <dt>Goal</dt>
      <dd>{goal}</dd>
      <dt>Body</dt>
      <dd>{body}</dd>
      <dt>Platform</dt>
      <dd>{platform}</dd>
    </dl>
  );
}
export default MeetingDescription;
