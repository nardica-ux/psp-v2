import React, { useState } from "react";
import { connect } from "react-redux";
import "./card-event-tab.scss";
import { pointEventToRedux } from "../../redux/redux-meetings/meeting-actions";
import AddEvent from "./event-add.component";
import CurrentEventSummary from "./event-summary-block";

const CardEventsTab = ({
  eventsData,
  meeting_id,
  currentEvent,
  pointEventToRedux,
  handleEventTab,
}) => {
  const eventTabNames = (events) => {
    let tabs = [];
    let count = 0;

    for (let key in events) {
      let el = events[key];

      let nextEl = (
        <div
          key={currentEvent + "-tab-" + count}
          className={currentEvent === el.event_id ? "active-event" : "link-tab"}
          key={meeting_id + "-event-" + count}
          onClick={() => {
            pointEventToRedux({ meeting_id, el: el.event_id });
            handleEventTab(el.event_id);
          }}
        >
          {el.date.date} at <br /> {el.date.time + el.date.ampm}
        </div>
      );
      count++;
      tabs.push(nextEl);
    }
    return tabs;
  };

  return (
    <form>
      <fieldset className="tab-set">
        <legend>last 3 events</legend>

        <div className="tab-container">
          {eventsData ? eventTabNames(eventsData[meeting_id]) : null}
        </div>

        <CurrentEventSummary event_id={currentEvent} meeting_id={meeting_id} />

        {/* <AddEvent meeting_id={meeting_id} event_id={currentEvent} /> */}
      </fieldset>
    </form>
  );
};
const mapStateToProps = (state) => ({
  eventsData: state.events.eventsData,
});
const mapDispatchToProps = (dispatch) => {
  return {
    pointEventToRedux: (obj) => dispatch(pointEventToRedux(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardEventsTab);
