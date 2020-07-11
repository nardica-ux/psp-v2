import React, { useState } from "react";
import { connect } from "react-redux";

import { createNewMeetingStart } from "../../redux/redux-meetings/meeting-actions";

const AddMeetingForm = ({ createNewMeetingStart, currentUser }) => {
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [platform, setPlatform] = useState("");
  const placehold = {
    author: "enter authors",
    title: "enter the title",
    goal: "define the goals(s)",
    platform: "select the platform you use",
    summary: "enter short description",
  };
  const user_id = currentUser.id;

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
        margin: "auto",
      }}
      name="new_meeting"
      onSubmit={(e) => {
        e.preventDefault();
        createNewMeetingStart({
          title,
          summary,
          author,
          platform,
          goal,
          user_id,
        });
      }}
    >
      <label htmlFor="new_meeting">Enter the Title</label>
      <input
        style={{ margin: 10 }}
        value={title}
        placeholder={placehold.title}
        type="text"
        name="new_meeting"
        className={"meeting-form"}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        style={{ margin: 10 }}
        placeholder={placehold.author}
        value={author}
        type="text"
        name="new_meeting"
        className={"meeting-form"}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        style={{ margin: 10 }}
        placeholder={placehold.platform}
        value={platform}
        type="text"
        name="new_meeting"
        className={"meeting-form"}
        onChange={(e) => setPlatform(e.target.value)}
      />
      <textarea
        style={{ margin: 10 }}
        value={goal}
        placeholder={placehold.goal}
        type="text"
        name="new_meeting"
        columns="50"
        className={"meeting-form"}
        rows="4"
        onChange={(e) => setGoal(e.target.value)}
      />
      <textarea
        style={{ margin: 10 }}
        placeholder={placehold.summary}
        value={summary}
        type="text"
        name="new_meeting"
        columns="50"
        rows="8"
        className={"meeting-form"}
        onChange={(e) => setSummary(e.target.value)}
      />
      <button type="submit" className="main" style={{ margin: 10, width: 120 }}>
        Create Meeting
      </button>
    </form>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});
const mapDispatchToProps = (dispatch) => {
  return {
    createNewMeetingStart: (obj) => dispatch(createNewMeetingStart(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddMeetingForm);
