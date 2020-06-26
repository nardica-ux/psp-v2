import React from "react";
import { connect } from "react-redux";
import MeetingList from "../components/meeting-card/meeting-list.component";

// get sorting logic to filter or sort meetings,

const MainPage = () => (
  <>
    <MeetingList />
  </>
);

export default connect(null)(MainPage);
