import React from "react";
import { connect } from "react-redux";
import "./card-event-tab.scss";
import { pointEventToRedux } from "../../redux/redux-meetings/meeting-actions";
import AddEvent from "./event-add.component";
import CurrentEventSummary from "./event-summary-block";

const CardEventsTab = ({
  meetings,
  meeting_id,
  currentEvent,
  pointEventToRedux,
  num,
}) => {
  const events = meetings[num].events;
  const currentOpenEvent = events[events.length - 1];

  const eventTabNames = events.map((el, i) => (
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
        <div className="tab-container">{eventTabNames}</div>

        <CurrentEventSummary event_id={currentOpenEvent} />
        <AddEvent meeting_id={meeting_id} />
      </fieldset>
    </form>
  );
};
const mapStateToProps = (state) => ({
  meetings: state.meetings.meetings,
});
const mapDispatchToProps = (dispatch) => {
  return {
    pointEventToRedux: (obj) => dispatch(pointEventToRedux(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardEventsTab);
