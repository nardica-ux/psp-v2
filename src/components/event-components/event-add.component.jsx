import React, { useState } from "react";
import { connect } from "react-redux";
import { addEventStart } from "../../redux/events/event-actions";

export const AddEvent = ({ addEventStart, currentUser, meeting_id }) => {
  const [editing, setEditing] = useState(false);
  const [event, setEvent] = useState({
    date: "",
    time: "",
    ampm: "PM",
    zone: "PST (- 8:00)",
  });
  const editForm = (
    <fieldset style={{ width: "96%" }}>
      <legend>Add the new meeting here</legend>
      <input
        type="date"
        value={event.date}
        onChange={(e) => setEvent({ ...event, date: e.target.value })}
      />
      <input
        type="time"
        value={event.time}
        onChange={(e) => setEvent({ ...event, time: e.target.value })}
      />
      <select
        value={event.ampm}
        onChange={(e) => setEvent({ ...event, ampm: e.target.value })}
      >
        <option value={"AM"}>AM</option>
        <option value={"PM"}>PM</option>
      </select>
      <select
        value={event.zone}
        onChange={(e) => setEvent({ ...event, zone: e.target.value })}
      >
        <option value={"PST (-8:00)"}>PST (-8:00)</option>
        <option value={"CST (-7:00)"}>CST (-7:00)</option>
        <option value={"EST (-6:00)"}>EST (-6:00)</option>
      </select>
      <button
        className="secondary"
        type="button"
        onClick={() => {
          addEventStart({
            meeting_id,
            date: event,
            user_id: currentUser.id,
            user_name: currentUser.displayName,
            user_email: currentUser.email,
          });
        }}
      >
        Save
      </button>
    </fieldset>
  );
  return (
    <form>
      {editing ? editForm : null}
      <button
        type="button"
        className="secondary"
        onClick={() => setEditing(!editing)}
      >
        {editing ? "Close" : "Add Event"}
      </button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});
const mapDispatchToProps = (dispatch) => {
  return {
    addEventStart: (obj) => dispatch(addEventStart(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
