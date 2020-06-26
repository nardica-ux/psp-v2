import React from "react";
import { connect } from "react-redux";
import "./user-styles.scss";

const UserEvaluations = ({ userEvaluations, meetingTitles, meetIds }) => {
  const userList = meetIds.map((elem, i) => (
    <>
      <h5>Evaluations for meeting {meetingTitles[i]}</h5>
      <div className="user-eval-line" key={"eval-div-" + i}>
        {userEvaluations[elem].length === 0 ? (
          <span>zero evals </span>
        ) : (
          userEvaluations[elem].map((el, i) => (
            <div className="user-eval-item" key={"eval-line-" + i}>
              <div className="user-eval-chip">difficulty: {el.difficulty} </div>
              <div className="user-eval">unity: {el.unity}</div>
              <div className="user-eval">intensity: {el.intensity}</div>
              <div className="user-eval">valueTotal:{el.valueTotal}</div>
            </div>
          ))
        )}
      </div>
    </>
  ));

  return <div>{userList}</div>;
};
export default UserEvaluations;
