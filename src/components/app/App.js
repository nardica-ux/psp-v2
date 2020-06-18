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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      count: null,
    };
  }

  async componentDidMount() {
    if (!this.props.meetings) {
      let meetings = await getBase("meetings");
      if (meetings) {
        console.log("fetching called");
        this.props.fetchAllMeetings(meetings);
      }
    }
  }

  async shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    if (nextProps.meetings.meetings === null) {
      let meetings = await getBase("meetings");
      if (meetings) {
        console.log("fetching called UPDATE");
        this.props.fetchAllMeetings(meetings);
      }
      return true;
    } else return false;
  }

  render() {
    const { meetings, meetIds } = this.props.meetings;
    const { clearMeetingsRedux } = this.props;

    return (
      <div className="App">
        <AppHeader />
        <div>
          <button
            onClick={() => {
              clearMeetingsRedux();
              // setUpdate();
            }}
          >
            Clear Meetings Redux
          </button>
        </div>
        <div className="main-box">
          {meetings
            ? meetings.map((el, i) => (
                <MeetingCard key={meetIds[i]} id={meetIds[i]} data={el} />
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
