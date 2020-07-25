import React, { useState } from "react";
import { connect } from "react-redux";
import { pointEventToRedux } from "../../redux/redux-meetings/meeting-actions";

const EventsListAll = ({
  meeting_id,
  eventsData,
  currentEvent,
  pointEventToRedux,
}) => {
  const [newCheck, handleCheck] = useState(currentEvent);
  const [details, ShowDetails] = useState(null);
  const eventsList = eventsData[meeting_id];

  let list = [];
  for (let option in eventsList) {
    let data = eventsList[option];
    const { stamp, event_id, topics } = data;

    list.push(
      <div className="page-flex" style={{ flexWrap: "wrap" }}>
        <input
          onChange={() => {
            pointEventToRedux({ meeting_id, el: event_id });
            handleCheck(event_id);
          }}
          type="radio"
          name="current_event"
          key={event_id}
          checked={newCheck === event_id ? true : false}
        />
        <label
          style={
            newCheck === event_id
              ? {
                  color: "royalblue",
                  textDecoration: "underline",
                }
              : null
          }
        >
          {new Date(stamp).toLocaleString()}
        </label>
        <span onClick={() => ShowDetails(event_id)} className="details">
          Details
        </span>
        {details === event_id ? (
          <div style={{ width: "100%" }}>
            {topics.map((el, i) => (
              <div className="details" key={details + i}>
                {el}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return <form name="current_event">{list}</form>;
};
const mapStateToProps = (state) => ({
  eventsData: state.events.eventsData,
});
const mapDispatchToProps = (dispatch) => {
  return {
    pointEventToRedux: (obj) => dispatch(pointEventToRedux(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventsListAll);
