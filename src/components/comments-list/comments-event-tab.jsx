import React, { useState } from "react";

const CommentEventsTab = ({ past_events, meeting_id, switchEvent }) => {
  const [activeEvent, setActiveEvent] = useState(0);

  const output = past_events.map((el, i) => (
    <div
      style={{
        color: activeEvent === i ? "royalblue" : "slateblue",
        textDecoration: activeEvent === i ? "underline" : "none",
        cursor: activeEvent === i ? null : "pointer",
      }}
      key={meeting_id + "-event-" + i}
      onClick={() => switchEvent(i)}
    >{`# ${el} #`}</div>
  ));
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {output}
    </div>
  );
};
export default CommentEventsTab;
