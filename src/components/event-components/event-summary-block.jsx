import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const CurrentEventSummary = ({
  // event_id,
  meeting_id,
  eventsData,
  activeEvents,
}) => {
  const [event_id, setId] = useState(activeEvents[meeting_id]);

  useEffect(() => {
    setId(activeEvents[meeting_id]);
  }, [activeEvents]);

  if (!eventsData) return null;

  const output = (data) => {
    if (data)
      return (
        <div style={{ width: "96%" }}>
          <details>
            <summary className="event-summary">
              {data.topics.map((el, i) => (
                <span className="event-details-topic" key={"topic-" + i}>
                  {el}
                </span>
              ))}

              <span
                className="small-link"
                onClick={() => console.log("register")}
              >
                Register >>
              </span>
            </summary>
            <p>
              Platform: {data.platform || null}
              <br /> Contact person: {data.org_name || null}
            </p>
          </details>
        </div>
      );
  };

  return eventsData ? output(eventsData[meeting_id][event_id]) : null;
};
const mapStateToProps = (state) => ({
  eventsData: state.events.eventsData,
  activeEvents: state.meetings.activeEvents,
});
export default connect(mapStateToProps)(CurrentEventSummary);
