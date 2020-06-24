import React, { useState } from "react";
import { connect } from "react-redux";

import { setMeetingCards } from "../../redux/redux-meetings/meeting-actions";
import "./meeting-card.scss";
import MeetingDescription from "./meeting-descr.component";
import CommentsList from "../comments-list/comments.list.component";
import TabHeader from "./card-content-tab";
import EvalutionBlock from "../evaluations-list/evaluations-list.component";

// ******************

function MeetingCard({ data, id, setMeetingCards, meetingCards }) {
  const [activeTab, setActiveTab] = useState(meetingCards[id]);
  const handleTab = (num) => {
    setActiveTab(num);
    setMeetingCards({ id, num });
  };
  // useEffect(() => {
  //   setEvaluationTab({ meeting_id: id, num: 0 });
  // }, [id]);

  const tabContent = (tab) => {
    switch (tab) {
      default:
        break;
      case 0:
        return <MeetingDescription data={data} />;
      case 1:
        return <CommentsList meeting_id={id} />;
      case 2:
        return <EvalutionBlock meeting_id={id} />;
    }
  };
  return (
    <div className="card">
      <h3 className="title">{data.title}</h3>
      <TabHeader tab={activeTab} handleTab={handleTab} id={id} />
      {tabContent(activeTab)}
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
export default connect(mapStateToProps, mapDispatchToProps)(MeetingCard);
