import React, { useState } from "react";
import "./meeting-card.scss";
import MeetingDescription from "../meeting-descr/meeting-descr.component";

function MeetingCard({ data }) {
  const [activeTab, setActiveTab] = useState(0);
  const handleTab = (num) => setActiveTab(num);

  const tabHeader = (activeTab) => (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
      }}
    >
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
  const tabContent = (tab) => {
    switch (tab) {
      default:
        break;
      case 0:
        return <MeetingDescription data={data} />;
      case 1:
        return <div>customElements</div>;
      case 2:
        return <div>evaluations</div>;
    }
  };
  return (
    <div className="card">
      <h3 className="title">{data.title}</h3>
      {tabHeader(activeTab)}
      {tabContent(activeTab)}
    </div>
  );
}

export default MeetingCard;
