import React, { useState } from "react";
import "./meeting-card.scss";

function TabHeader({ tab, setMeetingCards, id }) {
  const [activeTab, setActiveTab] = useState(tab || 0);

  const handleTab = (num) => {
    setActiveTab(num);
    setMeetingCards({ id, num });
  };

  return (
    <div className="tab-div">
      <div
        className={activeTab === 0 ? "active-tab" : "inactive-tab"}
        onClick={() => handleTab(0)}
      >
        Description
      </div>
      <div
        className={activeTab === 1 ? "active-tab" : "inactive-tab"}
        onClick={() => handleTab(1)}
      >
        Comments
      </div>
      <div
        className={activeTab === 2 ? "active-tab" : "inactive-tab"}
        onClick={() => handleTab(2)}
      >
        Evaluations
      </div>
    </div>
  );
}
export default TabHeader;
