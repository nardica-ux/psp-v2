import React from "react";
import { connect } from "react-redux";

import { clearEvalsRedux } from "../../redux/evaluations/evaluation-actions";
import { clearMeetingsRedux } from "../../redux/redux-meetings/meeting-actions";
import { clear_redux_user } from "../../redux/users/user-actions";

const ControlREduxButtons = ({
  clearMeetingsRedux,
  clearEvalsRedux,
  clear_redux_user,
}) => {
  return (
    <div style={{ display: "flex", alignContent: "center" }}>
      <button className="secondary" onClick={clearMeetingsRedux}>
        Clear Meetings Redux
      </button>
      <button className="secondary" onClick={clearEvalsRedux}>
        Clear Eval Redux
      </button>
      <button className="secondary" onClick={clear_redux_user}>
        Clear users
      </button>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearEvalsRedux: () => dispatch(clearEvalsRedux()),
    clear_redux_user: () => dispatch(clear_redux_user()),
    clearMeetingsRedux: () => dispatch(clearMeetingsRedux()),
  };
};
export default connect(null, mapDispatchToProps)(ControlREduxButtons);
