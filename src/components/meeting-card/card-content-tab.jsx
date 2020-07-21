import React, { useState } from "react";
import { connect } from "react-redux";
import { setMeetingCards } from "../../redux/redux-meetings/meeting-actions";
import "./meeting-card.scss";

function TabHeader({ id, setMeetingCards, meetingCards }) {
  const [activeTab, setActiveTab] = useState(meetingCards[id] || null);
  if (!meetingCards) return null;

  const handleCardTab = (num) => {
    setActiveTab(num);
    setMeetingCards({ id, num });
  };

  return (
    <div className="tab-div">
      <div
        className={activeTab === 0 ? "active-tab" : "inactive-tab"}
        onClick={() => handleCardTab(0)}
      >
        Description
      </div>
      <div
        className={activeTab === 1 ? "active-tab" : "inactive-tab"}
        onClick={() => handleCardTab(1)}
      >
        Comments
      </div>
      <div
        className={activeTab === 2 ? "active-tab" : "inactive-tab"}
        onClick={() => handleCardTab(2)}
      >
        Evaluations
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  meetingCards: state.meetings.meetingCards,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setMeetingCards: (obj) => dispatch(setMeetingCards(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TabHeader);
