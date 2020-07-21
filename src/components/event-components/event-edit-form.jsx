import React, { useState } from "react";
import { connect } from "react-redux";
import { eventUpdateStart } from "../../redux/events/event-actions";

const EditEventForm = ({
  data,
  meeting_id,
  event_id,
  setEditing,
  eventUpdateStart,
}) => {
  const { date, platform, participants, topics } = data;
  const [newDate, setDate] = useState(date);
  let topicNorm = {};
  topics.map((el, i) => (topicNorm[i] = el));
  const [editTopics, setTopics] = useState(topicNorm);

  const [newTopic, setNewTopic] = useState("");

  const topicTable = (
    <table>
      <tbody>
        {topics.length
          ? topics.map((el, i) => (
              <tr key={el + "-topic"}>
                <td>
                  <input
                    value={editTopics[i]}
                    name="topic"
                    onChange={(e) =>
                      setTopics({
                        ...editTopics,
                        [i]: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
            ))
          : null}
        <tr>
          <td>
            <input
              value={newTopic}
              name="topic"
              onChange={(e) => setNewTopic(e.target.value)}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTopic !== "") {
      editTopics[topics.length] = newTopic;
    }
    let filtered = Object.values(editTopics);
    filtered = filtered.filter((el) => el !== "");

    eventUpdateStart({
      event_id,
      topics: filtered,
      date: newDate,
    });
    setNewTopic("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="date">Event Date</label>
      <input
        name="date"
        type="date"
        value={newDate.date}
        onChange={(e) => setDate({ ...newDate, date: e.target.value })}
      />
      <input
        name="time"
        type="time"
        value={newDate.time}
        onChange={(e) => setDate({ ...newDate, time: e.target.value })}
      />
      <select
        name="ampm"
        value={newDate.ampm}
        onChange={(e) => setDate({ ...newDate, ampm: e.target.value })}
      >
        <option>PM</option>
        <option>AM</option>
      </select>
      <select
        name="zone"
        value={newDate.zone}
        onChange={(e) => setDate({ ...newDate, zone: e.target.value })}
      >
        <option>EST (- 6:00) </option>
        <option>CST (- 7:00) </option>
        <option>PST (- 8:00)</option>
      </select>
      <br />

      {topicTable}

      <button
        type="button"
        className="secondary"
        onClick={() => setEditing(false)}
      >
        Close
      </button>
      <button className="main"> Save </button>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    eventUpdateStart: (obj) => dispatch(eventUpdateStart(obj)),
  };
};
export default connect(null, mapDispatchToProps)(EditEventForm);
