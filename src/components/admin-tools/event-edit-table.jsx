import React, { useState } from "react";
import { connect } from "react-redux";
import EventTableRow from "./event-table-row";
import "./event-table-styles.scss";
import AddEvent from "../event-components/event-add.component";

const EventEditTable = ({ eventsData, meeting_id, meetings, num }) => {
  const [addingNew, setAdding] = useState(false);
  const tableData = (obj) => {
    let rows = [];
    for (let event in obj) {
      rows.push(<EventTableRow data={obj[event]} key={obj[event].event_id} />);
    }
    return rows;
  };
  return (
    <table className="event-table">
      <tr>
        <td colSpan="8">
          <h3>{meetings[num].title}</h3>
        </td>
        <td style={{ position: "relative" }}>
          <AddEvent />
        </td>
      </tr>
      <tbody>{tableData(eventsData[meeting_id])}</tbody>
    </table>
  );
};

const mapStateToProps = (state) => ({
  eventsData: state.events.eventsData,
  meetings: state.meetings.meetings,
});

export default connect(mapStateToProps)(EventEditTable);
