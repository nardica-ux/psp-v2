import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import "./App.scss";

import "./App.scss";
import AppHeader from "../app-header/app-header";
import ControlREduxButtons from "./control-redux-buttons";
import MainPage from "../../pages/main-page";
import MeetingPage from "../../pages/meeting-page";
import UserPage from "../../pages/user-page";
import UserEditTable from "../admin-tools/user-table";
import EvalsEditTable from "../admin-tools/evaluations-edit-table";
import MeetingsEditTable from "../admin-tools/meetings-edit-table";
import EventsEditPage from "../../pages/events-table-page";
import CommentsEditTable from "../admin-tools/comments-edit-table";

import { fetchMeetingsStart } from "../../redux/redux-meetings/meeting-actions";
import { fetchCommentsStart } from "../../redux/comments/comments-actions";
import { fetch_evaluations_start_async } from "../../redux/evaluations/evaluation-actions";
import { check_user_session } from "../../redux/users/user-actions";
import { fetchEventsOnMount } from "../../redux/events/event-actions";

import { clearEvalsRedux } from "../../redux/evaluations/evaluation-actions";
import { clearMeetingsRedux } from "../../redux/redux-meetings/meeting-actions";
import { clear_redux_user } from "../../redux/users/user-actions";
import MeetPage from "./section";

class App extends Component {
  unsubscribeFromAuth = null;

  async componentDidMount() {
    const {
      fetch_evaluations_start_async,
      fetchMeetingsStart,
      fetchCommentsStart,
      check_user_session,
      fetchEventsOnMount,
    } = this.props;
    check_user_session();
    fetchMeetingsStart(); // works with saga
    fetchCommentsStart(); //works with saga
    fetch_evaluations_start_async(); //works with thunk
    fetchEventsOnMount();
  }

  componentWillUnmount() {
    //  this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <AppHeader />

        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/meeting/:meeting_id" component={MeetingPage} />
          <Route exact path="/user" component={UserPage} />
          <Route exact path="/user/table" component={UserEditTable} />
          <Route path="/meetings/table" component={MeetingsEditTable} />
          <Route path="/events/table" component={EventsEditPage} />
          <Route path="/comments/table" component={CommentsEditTable} />
          <Route path="/evals/table" component={EvalsEditTable} />
          <Route path="/meetings" component={MeetPage} />
        </Switch>

        <div className="footer">
          <ControlREduxButtons />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMeetingsStart: () => dispatch(fetchMeetingsStart()),
    fetchCommentsStart: () => dispatch(fetchCommentsStart()),
    fetchEventsOnMount: () => dispatch(fetchEventsOnMount()),
    fetch_evaluations_start_async: () =>
      dispatch(fetch_evaluations_start_async()),

    check_user_session: () => dispatch(check_user_session()),
    clearEvalsRedux: () => dispatch(clearEvalsRedux()),
    clear_redux_user: () => dispatch(clear_redux_user()),
    clearMeetingsRedux: () => dispatch(clearMeetingsRedux()),
  };
};
export default connect(null, mapDispatchToProps)(App);
