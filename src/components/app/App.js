import React, { Component } from "react";
import { getBase } from "../../firebase/firebase.utils";
import { connect } from "react-redux";

import "./App.scss";
import AppHeader from "../app-header/app-header";
import MeetingCard from "../meeting-card/meeting-card.component";

import {
  fetchAllMeetings,
  clearMeetingsRedux,
} from "../../redux/redux-meetings/meeting-actions";
import { setCommentsRedux } from "../../redux/comments/comments-actions";
import {
  fetch_evaluations_start_async,
  clearEvalsRedux,
} from "../../redux/evaluations/evaluation-actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      count: null,
    };
  }

  async componentDidMount() {
    const { fetch_evaluations_start_async } = this.props;
    console.log("*** called component DID MOUNT");
    if (!this.props.meetings) {
      let meetings = await getBase("meetings");
      let comments = await getBase("meeting_comments");
      if (meetings) {
        console.log("*** fetching in DID MOUNT");
        this.props.fetchAllMeetings(meetings);
        this.props.setCommentsRedux(comments);
        fetch_evaluations_start_async();
      }
    }
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("*** called get SnapShot before udate");
    return true;
  }
  async shouldComponentUpdate(nextProps, nextState) {
    const { fetch_evaluations_start_async } = this.props;
    console.log("*** called componentSHOULD update");
    if (nextProps.meetings.meetings === null) {
      let meetings = await getBase("meetings");
      let comments = await getBase("meeting_comments");
      if (meetings) {
        console.log("*** fetching  shouldUPDATE");
        this.props.fetchAllMeetings(meetings);
        this.props.setCommentsRedux(comments);
        fetch_evaluations_start_async();
      }
      return true;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("*** called component_DID update", snapshot);
  }

  render() {
    const { meetings, meetIds, meetingCards } = this.props.meetings;
    const { clearMeetingsRedux, clearEvalsRedux } = this.props;

    return (
      <div className="App">
        <AppHeader />
        <div>
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
        </div>
        <div className="main-box">
          {meetings
            ? meetings.map((el, i) => (
                <MeetingCard
                  key={meetIds[i]}
                  num={i}
                  id={meetIds[i]}
                  tab={meetingCards[i]}
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
    fetchAllMeetings: (arr) => dispatch(fetchAllMeetings(arr)),
    clearMeetingsRedux: () => dispatch(clearMeetingsRedux()),
    setCommentsRedux: (arr) => dispatch(setCommentsRedux(arr)),
    fetch_evaluations_start_async: () =>
      dispatch(fetch_evaluations_start_async()),
    clearEvalsRedux: () => dispatch(clearEvalsRedux()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
