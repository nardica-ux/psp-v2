import React from "react";
import { withRouter, Link } from "react-router-dom";

const MeetingPage = (props) => {
  console.log(props);
  return (
    <div onClick={() => props.history.pushState(`${props.match.url}14`)}>
      hello from meeting page {props.match.params.meeting_id}
    </div>
  );
};

export default withRouter(MeetingPage);
