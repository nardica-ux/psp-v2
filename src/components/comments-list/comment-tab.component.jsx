import React, { useState } from "react";
import "./comment-list.scss";

const CommentTab = ({ handleSort }) => {
  const [tab, setTab] = useState(0);

  return (
    <div className="comment-filter-tab">
      <div
        className={tab === 0 ? "active" : null}
        onClick={() => {
          setTab(0);
          handleSort(0);
        }}
      >
        Last 3
      </div>
      <div
        className={tab === 1 ? "active" : null}
        onClick={() => {
          setTab(1);
          handleSort(1);
        }}
      >
        Popular 3
      </div>
      <div
        className={tab === 2 ? "active" : null}
        onClick={() => {
          setTab(2);
          handleSort(2);
        }}
      >
        All
      </div>
    </div>
  );
};

export default CommentTab;
