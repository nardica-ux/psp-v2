import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  UserProfileAva,
  UserMoto,
  UserBio,
} from "../components/user-components/user-profile-ava";
import UserEvaluations from "../components/user-components/user-evaluations.component";

// get sorting logic to filter or sort meetings,

const UserPage = (props) => {
  if (!props.currentUser) return <Redirect to="/" />;
  const {
    currentUser,
    evaluationData,
    meetIds,
    meetings,
    commentsData,
  } = props;
  const { displayName, id } = currentUser;

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
      <h3>profile {displayName} </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <UserProfileAva />
        <div style={{ border: "1px solid grey", borderRadius: 12 }}>
          <h3>My Bio</h3>
          <UserMoto moto={"love to live and talk"} />
        </div>
        <div style={{ border: "1px solid grey", borderRadius: 12 }}>
          <h3>My Bio</h3>
          <UserBio bio={"some text more of then"} />
        </div>
      </div>

      <h3>My Evaluations</h3>
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
