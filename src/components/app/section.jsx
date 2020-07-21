import React from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";

const Meeting = ({ match, data }) => {
  let section = data.find((s) => s.id == match.params.sectionId);
  let sectionDiv;

  if (section) {
    sectionDiv = <div>{section.intro}</div>;
  } else sectionDiv = <div>Page under construction</div>;

  return sectionDiv;
};

const MeetPage = ({ match, meetings }) => {
  let linkList = [];
  if (meetings)
    linkList = meetings.map((meeting) => (
      <li>
        <Link to={`${match.url}/${meeting.meeting_id}`}>{meeting.title}</Link>
      </li>
    ));

  return (
    <div>
      <ul>Menu: {linkList}</ul>
      <Route
        path={`${match.url}/:meeting_id`}
        render={(props) => <Meeting data={meetings} {...props} />}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  meetings: state.meetings.meetings,
});
export default connect(mapStateToProps)(MeetPage);
