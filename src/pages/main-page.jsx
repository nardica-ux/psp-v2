import React, { useState } from "react";

import MeetingList from "../components/meeting-card/meeting-list.component";
import AddMeetingForm from "../components/admin-tools/add_meeting-form";

const MainPage = () => {
  const [editing, setEditingMode] = useState(false);

  return (
    <>
      <button onClick={() => setEditingMode(!editing)} className="main">
        {editing ? "Close" : "Create Meeting"}
      </button>
      {editing ? <AddMeetingForm /> : <MeetingList />}
    </>
  );
};

export default MainPage;
