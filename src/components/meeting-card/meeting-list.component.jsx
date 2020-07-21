import React from "react";
import { connect } from "react-redux";
import MeetingCard from "../meeting-card/meeting-card.component";

const MeetingList = ({ meetings: { meetings, meetIds } }) => {
  return (
    <div className="main-box">
      {meetings && meetings[0] !== null
        ? meetings.map((el, i) => (
            <MeetingCard
              key={meetIds[i]}
              meeting_num={i}
              id={meetIds[i]}
              title={el.title}
            />
          ))
        : null}
    </div>
  );
};
const mapStateToProps = (state) => ({
  meetings: state.meetings,
});
export default connect(mapStateToProps)(MeetingList);
