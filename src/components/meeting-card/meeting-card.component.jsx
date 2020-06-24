import React, { useEffect } from "react";
import { connect } from "react-redux";

import { setMeetingCards } from "../../redux/redux-meetings/meeting-actions";
import "./meeting-card.scss";
import { setEvaluationTab } from "../../redux/evaluations/evaluation-actions";
import MeetingDescription from "./meeting-descr.component";
import CommentsList from "../comments-list/comments.list.component";
import TabHeader from "./card-content-tab";
import EvalutionBlock from "../evaluations-list/evaluations-list.component";

// ******************

function MeetingCard({
  data,
  id,
  setEvaluationTab,
  setMeetingCards,
  meetingCards,
}) {
  const activeTab = meetingCards[id];
  useEffect(() => {
    setEvaluationTab({ meeting_id: id, num: 0 });
  }, [id]);

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
      <TabHeader tab={activeTab} setMeetingCards={setMeetingCards} id={id} />
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
    setEvaluationTab: (id) => dispatch(setEvaluationTab(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MeetingCard);
