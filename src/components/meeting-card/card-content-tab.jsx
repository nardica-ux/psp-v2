import React from "react";
import "./meeting-card.scss";

function TabHeader({ tab, handleTab, id }) {
  return (
    <div className="tab-div">
      <div
        className={tab === 0 ? "active-tab" : "inactive-tab"}
        onClick={() => handleTab(0)}
      >
        Description
      </div>
      <div
        className={tab === 1 ? "active-tab" : "inactive-tab"}
        onClick={() => handleTab(1)}
      >
        Comments
      </div>
      <div
        className={tab === 2 ? "active-tab" : "inactive-tab"}
        onClick={() => handleTab(2)}
      >
        Evaluations
      </div>
    </div>
  );
}
export default TabHeader;
