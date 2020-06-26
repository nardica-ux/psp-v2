import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import "./App.scss";
import AppHeader from "../app-header/app-header";
import ControlREduxButtons from "./control-redux-buttons";
import MainPage from "../../pages/main-page";
import MeetingPage from "../../pages/meeting-page";
import UserPage from "../../pages/user-page";

import { fetchMeetingsStart } from "../../redux/redux-meetings/meeting-actions";
import { fetchCommentsStart } from "../../redux/comments/comments-actions";
import { fetch_evaluations_start_async } from "../../redux/evaluations/evaluation-actions";
import { check_user_session } from "../../redux/users/user-actions";

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
    fetchMeetingsStart(); // works with saga
    fetchCommentsStart(); //works with SAGA
    fetch_evaluations_start_async(); //works with thunk
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
    return (
      <div className="App">
        <AppHeader />
        <ControlREduxButtons />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/meeting/:meeting_id" component={MeetingPage} />
          <Route path="/user/:id" component={UserPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMeetingsStart: () => dispatch(fetchMeetingsStart()),
    fetchCommentsStart: () => dispatch(fetchCommentsStart()),
    fetch_evaluations_start_async: () =>
      dispatch(fetch_evaluations_start_async()),

    check_user_session: () => dispatch(check_user_session()),
  };
};
export default connect(null, mapDispatchToProps)(App);
