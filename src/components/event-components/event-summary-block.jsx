import React from "react";
import { connect } from "react-redux";

const CurrentEventSummary = ({ event_id }) => {
  return (
    <div>
      <p>{event_id}</p>
      <p>
        for exchanging the thoughts, ideas and experience for the improving the
        PSP project from the perspectives of coaches and users Summary : meeting
        is set to 1hr, with discussion the questions posted in WeeklySummary,
        the expected result is set of prioritized features and issues to fix
      </p>
    </div>
  );
};

export default connect()(CurrentEventSummary);
