import React from "react";

const TopicPage = (props) => (
  <div>hello from TOPIc, details ::: {props.match.params.meeting_id}</div>
);

export default TopicPage;
