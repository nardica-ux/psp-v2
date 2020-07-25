import React, { useState } from "react";
import { connect } from "react-redux";
import "./card-event-tab.scss";
import { pointEventToRedux } from "../../redux/redux-meetings/meeting-actions";
import "./card-event-tab.scss";

const CardEventsTab = ({
  eventsData,
  meeting_id,
  currentEvent,
  pointEventToRedux,
}) => {
  const [open, setOpen] = useState(null);
  const eventDataArr = [];
  if (eventsData) {
    for (let event in eventsData[meeting_id])
      eventDataArr.push(eventsData[meeting_id][event]);
  }

  const eventTab = (type, data) => (
    <div
      onClick={() => {
        pointEventToRedux({ meeting_id, el: data.event_id });
        setOpen(data.event_id);
      }}
    >
      <p className="legend">{type}</p>
      <p
        className="event-link"
        onClick={() => setOpen(open === data.event_id ? null : data.event_id)}
      >
        {open === data.event_id ? "close" : "details >>"}
      </p>
      <div
        className={data.event_id === currentEvent ? "active-event" : "link-tab"}
      >
        {new Date(data.stamp).toLocaleString()}
      </div>
    </div>
  );

  return (
    <div className="tab-set">
      <h5 className="legend">Selected weekly group meeting</h5>

      {eventDataArr.length ? (
        <div className="tab-container">
          {eventTab("last event", eventDataArr[0])}
          {eventTab("upcoming event", eventDataArr[1])}
          {eventTab("next week", eventDataArr[eventDataArr.length - 1])}
        </div>
      ) : null}
      {open ? (
        <div className="event-brief">
          <h5 style={{ display: "inline-block" }}>
            Questions for this meeting:{" "}
          </h5>
          <span className="event-link" onClick={() => setOpen(null)}>
            X close
          </span>
          <br />
          {eventsData[meeting_id][currentEvent].topics.map((question, i) => (
            <span key={open + i}>{question} / </span>
          ))}
        </div>
      ) : null}

      <span className="event-link">see all meetings >></span>
    </div>
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
