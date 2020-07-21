import React, { useState } from "react";
import { connect } from "react-redux";
import "./card-event-tab.scss";
import { pointEventToRedux } from "../../redux/redux-meetings/meeting-actions";
import "./card-event-tab.scss";
import CurrentEventSummary from "../event-components/event-summary-block";

const CardEventsTab = ({
  eventsData,
  meeting_id,
  currentEvent,
  pointEventToRedux,
}) => {
  const [open, setOpen] = useState(null);

  const eventTabNames = () => {
    let tabs = [];
    let count = 0;
    let events = eventsData[meeting_id];

    for (let key in events) {
      let el = events[key];
      let event_date = el.date.date.split("-");
      event_date = `${event_date[1]}-${event_date[2]} at ${el.date.time} ${el.date.ampm}`;
      if (count !== 0) event_date = "| " + event_date;

      let nextEl = (
        <div
          key={currentEvent + "-tab-" + count}
          className={currentEvent === el.event_id ? "active-event" : "link-tab"}
          key={meeting_id + "-event-" + count}
          onClick={() => {
            pointEventToRedux({ meeting_id, el: el.event_id });
          }}
        >
          {open === el.event_id ? (
            <span className="tab-icon" onClick={() => setOpen(null)}>
              -
            </span>
          ) : (
            <span className="tab-icon" onClick={() => setOpen(el.event_id)}>
              +
            </span>
          )}

          {event_date}
        </div>
      );
      count++;
      tabs.push(nextEl);
    }
    return tabs;
  };

  return (
    <fieldset className="tab-set">
      <legend>last 3 events</legend>

      <div className="tab-container">{eventsData ? eventTabNames() : null}</div>
      {open ? (
        <CurrentEventSummary meeting_id={meeting_id} event_id={open} />
      ) : null}
    </fieldset>
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
