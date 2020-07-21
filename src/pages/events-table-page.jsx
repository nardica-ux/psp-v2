import React from "react";
import { connect } from "react-redux";
import EventEditTable from "../components/admin-tools/event-edit-table";

const EventsEditPage = ({ meetIds }) => {
  return (
    <div>
      <h2>Events Overview</h2>
      {meetIds.map((el, i) => (
        <EventEditTable meeting_id={el} key={el} num={i} />
      ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  eventsData: state.events.eventsData,
  meetIds: state.meetings.meetIds,
});
export default connect(mapStateToProps)(EventsEditPage);
