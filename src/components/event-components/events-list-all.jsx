import React, { useState } from "react";
import { connect } from "react-redux";

const EventsListAll = ({ meeting_id, eventsData }) => {
  const [newCheck, handleCheck] = useState(null);
  const eventsList = eventsData[meeting_id];

  console.log(newCheck);

  let list = [];
  for (let option in eventsList) {
    let data = eventsList[option];
    const { date, event_id } = data;
    list.push(
      <React.Fragment>
        <input
          onChange={(e) => handleCheck(e.target.id)}
          type="radio"
          name="current_event"
          id={event_id}
          key={event_id}
          checked={newCheck === event_id ? true : false}
        />
        <label>
          {date.date} at {date.time}
        </label>
        <br />
      </React.Fragment>
    );
  }

  return (
    <form
      name="current_event"
      //  onChange={(e) => handleCheck(e.target.id)}
    >
      {list}
    </form>
  );
};
const mapStateToProps = (state) => ({
  eventsData: state.events.eventsData,
});
export default connect(mapStateToProps)(EventsListAll);
