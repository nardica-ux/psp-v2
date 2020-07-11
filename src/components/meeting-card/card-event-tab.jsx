import React, { useState } from "react";
import { connect } from "react-redux";
import "./card-event-tab.scss";
import { pointEventToRedux } from "../../redux/redux-meetings/meeting-actions";

const CardEventsTab = ({
  past_events,
  meeting_id,
  currentEvent,
  pointEventToRedux,
}) => {
  const output = past_events.map((el, i) => (
    <div
      key={currentEvent + i}
      className={currentEvent === el ? "active-event" : "link-tab"}
      key={meeting_id + "-event-" + i}
      onClick={() => pointEventToRedux({ meeting_id, el })}
    >
      {el}
    </div>
  ));
  return (
    <form>
      <fieldset className="tab-set">
        <legend>last 3 events</legend>
        <div className="tab-container">{output}</div>
      </fieldset>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    pointEventToRedux: (obj) => dispatch(pointEventToRedux(obj)),
  };
};
export default connect(null, mapDispatchToProps)(CardEventsTab);
