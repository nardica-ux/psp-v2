import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.scss";
import AppHeader from "../app-header/app-header";
import MeetingCard from "../meeting-card/meeting-card.component";

import {
  clearMeetingsRedux,
  fetchMeetingsStart,
} from "../../redux/redux-meetings/meeting-actions";
import { fetchCommentsStart } from "../../redux/comments/comments-actions";
import {
  fetch_evaluations_start_async,
  clearEvalsRedux,
} from "../../redux/evaluations/evaluation-actions";
import {
  clear_redux_user,
  check_user_session,
} from "../../redux/users/user-actions";

class App extends Component {
  unsubscribeFromAuth = null;

  async componentDidMount() {
    const {
      fetch_evaluations_start_async,
      fetchMeetingsStart,
      fetchCommentsStart,
      check_user_session,
    } = this.props;
    console.log("*** called component DID MOUNT");
    check_user_session();
    if (!this.props.meetings.meetings) {
      fetchMeetingsStart(); // works with saga
      fetchCommentsStart(); //works with SAGA
      fetch_evaluations_start_async(); //works with thunk
    }
  }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log("*** called get SnapShot before udate");
  // }
  // async shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps === nextState) return false;
  // }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log("*** called component_DID update", snapshot);
  // }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { meetings, meetIds } = this.props.meetings;
    const {
      clearMeetingsRedux,
      clearEvalsRedux,
      clear_redux_user,
    } = this.props;

    return (
      <div className="App">
        <AppHeader />
        <div style={{ display: "flex", alignContent: "center" }}>
          <button
            className="secondary"
            onClick={() => {
              clearMeetingsRedux();
            }}
          >
            Clear Meetings Redux
          </button>
          <button
            className="secondary"
            onClick={() => {
              clearEvalsRedux();
            }}
          >
            Clear Eval Redux
          </button>
          <button className="secondary" onClick={() => clear_redux_user}>
            Clear users
          </button>
        </div>

        <div className="main-box">
          {meetings
            ? meetings.map((el, i) => (
                <MeetingCard
                  key={meetIds[i]}
                  num={i}
                  id={meetIds[i]}
                  data={el}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  meetings: state.meetings,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMeetingsStart: () => dispatch(fetchMeetingsStart()),
    clearMeetingsRedux: () => dispatch(clearMeetingsRedux()),
    fetchCommentsStart: () => dispatch(fetchCommentsStart()),
    fetch_evaluations_start_async: () =>
      dispatch(fetch_evaluations_start_async()),
    clearEvalsRedux: () => dispatch(clearEvalsRedux()),
    clear_redux_user: () => dispatch(clear_redux_user()),
    check_user_session: () => dispatch(check_user_session()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
