import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import MeetingList from "../components/meeting-card/meeting-list.component";
import AddMeetingForm from "../components/admin-tools/add_meeting-form";

const MainPage = ({ currentUser }) => {
  const [editing, setEditingMode] = useState(false);
  // if (!currentUser) return <Redirect to="/" />;
  return (
    <>
      <h2> Active weekly meeting list </h2>
      {editing ? <AddMeetingForm /> : <MeetingList />}
      {currentUser && currentUser.type === "admin" ? (
        <button
          style={{ alignSelf: "flex-end" }}
          onClick={() => setEditingMode(!editing)}
          className="secondary"
        >
          {editing ? "Close" : "Create Meeting"}
        </button>
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});
export default connect(mapStateToProps)(MainPage);
