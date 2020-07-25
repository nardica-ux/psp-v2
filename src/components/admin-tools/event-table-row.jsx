import React, { useState } from "react";
import { connect } from "react-redux";
import "./event-table-styles.scss";
import { eventUpdateStart } from "../../redux/events/event-actions";

export const EventTableRow = ({ data, eventUpdateStart, next }) => {
  const [editing, setEdit] = useState(false);

  const {
    org_name,
    org_email,
    link,
    platform,
    topics,
    question,
    participants,
    event_id,
    meeting_id,
    stamp,
  } = data;

  const [newName, setName] = useState(org_name);
  const [newEmail, setEmail] = useState(org_email);
  const [newLink, setLink] = useState(link);
  const [newDate, setDate] = useState(stamp);

  const arrToObject = (arr) => {
    let dataNorm = {};
    for (let i = 0; i < arr.length; i++) {
      dataNorm[i] = arr[i];
    }
    return dataNorm;
  };
  const objToArray = (obj) => {
    let filtered = Object.values(obj);
    let filteredArr = filtered.filter((el) => el !== "");
    return filteredArr;
  };

  const [newTopics, setTopics] = useState(arrToObject(topics) || []);
  const [additionalTopic, setAdditional] = useState("");
  const [thisParticipants, setParticipants] = useState(
    arrToObject(participants)
  );
  const [newParticipant, addParticipant] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (additionalTopic !== "") {
      newTopics[topics.length] = additionalTopic;
    }
    if (newParticipant !== "") {
      thisParticipants[participants.length] = newParticipant;
    }

    let update = { event_id };
    if (Object.values(newTopics) !== topics)
      update.topics = objToArray(newTopics);
    if (Object.values(thisParticipants) !== participants)
      update.participants = objToArray(thisParticipants);

    if (newEmail !== org_email) update.org_email = newEmail;
    if (newName !== org_name) update.org_name = newName;
    if (newDate) update.date = newDate;

    eventUpdateStart(update);
    setAdditional("");
    addParticipant("");
  };

  return (
    <tr style={editing ? { backgroundColor: "whitesmoke" } : null}>
      <td>
        <button
          className={editing ? "main" : "secondary"}
          onClick={() => {
            setEdit(!editing);
          }}
        >
          {editing ? "close" : "edit"}
        </button>
        {editing ? (
          <button className="main" onClick={(e) => handleSubmit(e)}>
            Save
          </button>
        ) : null}
      </td>
      <td>
        {editing ? (
          <select
            name="org_name"
            value={newName}
            onChange={(e) => setName(e.target.value)}
          >
            <option value={"Nadia"}>Nadia</option>
            <option value={"Jane"}>Jane</option>
          </select>
        ) : (
          newName
        )}
      </td>
      <td>
        {editing ? (
          <select
            name="org_email"
            value={newEmail}
            onChange={(e) => setEmail(e.target.value)}
          >
            <option value={"info@psp.com"}>info@psp.com</option>
            <option value={"coach@psp.com"}>coach@psp.com</option>
          </select>
        ) : (
          newEmail
        )}
      </td>
      <td>
        {editing ? (
          <input
            name="link"
            value={newLink}
            onChange={(e) => setLink(e.target.value)}
          />
        ) : (
          newLink
        )}
      </td>
      <td style={next ? { backgroundColor: "wheat" } : null}>
        {editing ? (
          <input
            value={newDate}
            type="datetime-local"
            onChange={(e) => setDate(e.target.value)}
          />
        ) : typeof newDate === "string" ? (
          new Date(newDate).toLocaleString()
        ) : (
          new Date(newDate).toLocaleString()
        )}
      </td>
      <td>{platform} </td>
      <td>
        {topics.map((el, i) =>
          editing ? (
            <input
              key={data.event_id + "-topic-" + i}
              value={newTopics[i]}
              onChange={(e) => setTopics({ ...newTopics, [i]: e.target.value })}
            />
          ) : (
            <span className="table-chip" key={i + "-topics-" + data.event_id}>
              {el}
            </span>
          )
        )}
        {editing ? (
          <input
            value={additionalTopic}
            onChange={(e) => setAdditional(e.target.value)}
          />
        ) : null}
      </td>
      <td>
        {editing
          ? participants.map((el, i) => (
              <input
                key={data.event_id + "-people-" + i}
                value={thisParticipants[i]}
                onChange={(e) =>
                  setParticipants({ ...thisParticipants, [i]: e.target.value })
                }
              />
            ))
          : participants.map((el, i) => (
              <span className="table-chip" key={i + "-people-" + data.event_id}>
                {el}
              </span>
            ))}
        {editing ? (
          <input
            value={newParticipant}
            onChange={(e) => addParticipant(e.target.value)}
          />
        ) : null}
      </td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    eventUpdateStart: (obj) => dispatch(eventUpdateStart(obj)),
  };
};
export default connect(null, mapDispatchToProps)(EventTableRow);
