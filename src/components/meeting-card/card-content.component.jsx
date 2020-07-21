import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import EvalutionBlock from "../evaluations-list/evaluations-list.component";
import MeetingDescription from "./meeting-descr.component";
import CommentsList from "../comments-list/comments.list.component";

const CardActiveContent = ({ id, num, meeting_id, currentEvent }) => {
  const content = (tab) => {
    switch (tab) {
      default:
        break;
      case 0:
        return (
          <MeetingDescription
            meeting_id={id}
            num={num}
            currentEvent={currentEvent}
          />
        );
      case 1:
        return (
          <CommentsList meeting_id={meeting_id} currentEvent={currentEvent} />
        );
      case 2:
        return (
          <EvalutionBlock meeting_id={meeting_id} currentEvent={currentEvent} />
        );
    }
  };

  return content(num);
};
export default CardActiveContent;
