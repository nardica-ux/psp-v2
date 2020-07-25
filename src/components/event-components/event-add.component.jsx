import React, { useState } from "react";
import { connect } from "react-redux";
import "../app/App.scss";
import { addEventStart } from "../../redux/events/event-actions";

export const AddEvent = ({ addEventStart, currentUser, meeting_id }) => {
  const [editing, setEditing] = useState(false);
  const [eventStamp, setEvent] = useState("");
  const [link, setLink] = useState("");
  const [platform, setPlatform] = useState("");
  const [topic, addTopic] = useState("");
  const [addedTopics, addTopicLine] = useState([]);
  const [editTopic, startEditTopic] = useState({ index: null });

  const handleAdd = () => {
    let moreTopics = [...addedTopics, topic];
    addTopicLine(moreTopics);
    addTopic("");
  };
  const handleEditTopic = () => {
    let updatedTopics = [...addedTopics];
    updatedTopics[editTopic.index] = editTopic.value;
    let cleared = updatedTopics.filter((el) => el !== "");
    addTopicLine(cleared);
    startEditTopic({ index: null });
    addTopic("");
  };

  const handleAddEvent = () => {
    let topicsCheck = [...addedTopics];
    let cleared = topicsCheck.filter((el) => el !== "");
    addTopicLine(cleared);

    if (!link) {
      alert("please, provide viable link");
      return;
    }
    if (!platform) {
      alert("please, provide viable platform");
      return;
    }
    if (!eventStamp) {
      alert("please, set the date");
      return;
    }
    if (addedTopics.length < 3) {
      alert("please, set at least 3 topics");
      return;
    }
    addEventStart({
      meeting_id,
      link,
      platform,
      stamp: eventStamp,
      user_id: currentUser.id,
      user_name: currentUser.displayName,
      user_email: currentUser.email,
      topics: addedTopics,
    });
  };

  const editForm = (
    <div className="pop-up-container">
      <fieldset className="pop-up">
        <h3>Add the new meeting here</h3>
        <table style={{ margin: "auto" }}>
          <tbody>
            <tr>
              <td>
                <label htmlFor="datetime">Enter the date</label>
              </td>
              <td>
                <input
                  type="datetime-local"
                  value={eventStamp}
                  onChange={(e) => setEvent(e.target.value)}
                  name="datetime"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="link">Enter the link</label>
              </td>
              <td>
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  name="link"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="platform">Select the platform</label>
              </td>
              <td>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  name="platform"
                >
                  <option value="">select </option>
                  <option value="zoom">Zoom</option>
                  <option value="skype">Skype</option>
                  <option value="youtube">YuoTube Live</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <p>Add event topics</p>
              </td>
              <td>
                {addedTopics.length
                  ? addedTopics.map((el, i) => {
                      return editTopic.index === i ? (
                        <div>
                          <input
                            value={editTopic.value}
                            key={"edittopic-" + i}
                            onChange={(e) =>
                              startEditTopic({
                                ...editTopic,
                                value: e.target.value,
                              })
                            }
                          />
                          <button
                            type="button"
                            className="main"
                            onClick={() => handleEditTopic()}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div key={"newtopic-" + i}>
                          {el}{" "}
                          <button
                            className="secondary"
                            type="button"
                            onClick={() =>
                              startEditTopic({ value: el, index: i })
                            }
                          >
                            edit
                          </button>
                        </div>
                      );
                    })
                  : null}
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="topic">Enter the topic</label>
              </td>
              <td>
                <input
                  name="topic"
                  onChange={(e) => addTopic(e.target.value)}
                />
                <button
                  type="button"
                  className="main"
                  onClick={() => handleAdd()}
                >
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="secondary"
          type="button"
          onClick={() => handleAddEvent()}
        >
          Save
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Close" : "Add Event"}
        </button>
      </fieldset>
    </div>
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
