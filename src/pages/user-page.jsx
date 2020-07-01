import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import UserEvaluations from "../components/user-components/user-evaluations.component";
import UserAboutSelf from "../components/user-components/user-about-self";

// get sorting logic to filter or sort meetings,

const UserPage = ({
  currentUser,
  evaluationData,
  meetIds,
  meetings,
  commentsData,
}) => {
  const [editing, setEdit] = useState(false);

  if (!currentUser) return <Redirect to="/" />;
  if (editing) return <Redirect to="/editing" id={editing} />;
  const { id } = currentUser;

  let meetingTitles = meetings.map((el) => el.title);
  const getUserData = (us_id, type) => {
    let userData = [];
    let data = [];
    type === "evaluations" ? (data = evaluationData) : (data = commentsData);
    meetIds.map((meeting) => {
      userData[meeting] = data[meeting].filter((el) => el.user_id === us_id);
    });
    return userData;
  };

  return (
    <div
    // onClick={() => props.history.pushState(`${props.match.url}${id}`)}
    >
      <UserAboutSelf currentUser={currentUser} setEdit={setEdit} />
      <UserEvaluations
        meetingTitles={meetingTitles}
        meetIds={meetIds}
        userEvaluations={getUserData(id, "evaluations")}
      />
      <h3>My Comments</h3>
      <div>shall see comments user made</div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
  evaluationData: state.evaluations.evaluationData,
  meetIds: state.meetings.meetIds,
  meetings: state.meetings.meetings,
  commentsData: state.comments.commentsData,
});
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps)(UserPage);
