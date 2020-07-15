import React from "react";
import { connect } from "react-redux";

const CurrentEventSummary = ({ event_id, meeting_id, eventsData }) => {
  const output = (data) => {
    if (data)
      return (
        <div>
          <p>
            Register: {data.link || null} at {data.platform || null}
          </p>
          <p> Organizer: {data.org_name || null} </p>
        </div>
      );
  };

  return eventsData ? output(eventsData[meeting_id][event_id]) : null;
};
const mapStateToProps = (state) => ({
  eventsData: state.events.eventsData,
});
export default connect(mapStateToProps)(CurrentEventSummary);
