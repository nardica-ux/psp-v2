import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const MeetingCardHeader = ({ meeting_id, title, hint }) => {
  return (
    <div className="title-box">
      <span className="hint">
        <div className="meeting-pop-hint">Summary: {hint}</div>?
      </span>
      <h3 className="title">{title}</h3>
      <Link className="hint" to={`/meeting/${meeting_id}`}>
        Details
      </Link>
    </div>
  );
};
export default connect()(MeetingCardHeader);
