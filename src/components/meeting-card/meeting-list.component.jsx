import React from "react";
import { connect } from "react-redux";
import MeetingCard from "../meeting-card/meeting-card.component";

const MeetingList = ({ meetings: { meetings, meetIds } }) => {
  return (
    <div className="main-box">
      {meetings
        ? meetings.map((el, i) => (
            <MeetingCard key={meetIds[i]} num={i} id={meetIds[i]} data={el} />
          ))
        : null}
    </div>
  );
};
const mapStateToProps = (state) => ({
  meetings: state.meetings,
});
export default connect(mapStateToProps)(MeetingList);
