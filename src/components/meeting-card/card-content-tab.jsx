import React from "react";
import "./meeting-card.scss";

function TabHeader({ tab, handleCardTab, id }) {
  return (
    <div className="tab-div">
      <div
        className={tab === 0 ? "active-tab" : "inactive-tab"}
        onClick={() => handleCardTab(0)}
      >
        Description
      </div>
      <div
        className={tab === 1 ? "active-tab" : "inactive-tab"}
        onClick={() => handleCardTab(1)}
      >
        Comments
      </div>
      <div
        className={tab === 2 ? "active-tab" : "inactive-tab"}
        onClick={() => handleCardTab(2)}
      >
        Evaluations
      </div>
    </div>
  );
}
export default TabHeader;
