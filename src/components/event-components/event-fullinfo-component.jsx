import React, { useState } from "react";
import { connect } from "react-redux";
import EventsListAll from "./events-list-all";
import "./card-event-tab.scss";

const MeetingAllEvents = ({ meeting_id, currentEvent, eventsData }) => {
  const eventTabs = [
    "All Events",
    "Past Events",
    "Upcoming Events",
    "Current Event Details",
  ];
  const [activeTab, setActiveTab] = useState(0);
  const eventHeader = eventTabs.map((el, i) => (
    <div
      key={currentEvent + "-tab-" + i}
      className={activeTab === i ? "active-event" : "link-tab"}
      style={{ fontSize: 12, justifyContent: "center" }}
      onClick={() => setActiveTab(i)}
    >
      {el}
    </div>
  ));
  let pastEvents = [];
  let upComingEvents = [];

  let todayNumber = new Date();
  todayNumber = todayNumber.valueOf();

  for (let event in eventsData) {
    let eventNumber = new Date(eventsData[event].stamp);
    eventNumber = eventNumber.valueOf();
    if (eventNumber > todayNumber) {
      upComingEvents.push(eventsData[event]);
    } else {
      pastEvents.push(eventsData[event]);
    }
    upComingEvents.sort(
      (a, b) => new Date(a.stamp).valueOf() - new Date(b.stamp).valueOf()
    );
    pastEvents.sort(
      (a, b) => new Date(b.stamp).valueOf() - new Date(a.stamp).valueOf()
    );
  }

  const list = ({ title, arr }) => (
    <div>
      <h4> {title}</h4>
      {arr.map((el, i) => (
        <div key={el.event_id + "-stamp"}>
          {new Date(el.stamp).toLocaleString()}
        </div>
      ))}
    </div>
  );

  const activeContent = (tab) => {
    switch (tab) {
      default:
        break;
      case 0:
        return (
          <EventsListAll meeting_id={meeting_id} currentEvent={currentEvent} />
        );
      case 1:
        return list({ title: "Past Events", arr: pastEvents });
      case 2:
        return list({ title: "Upcoming Events", arr: upComingEvents });
      case 3:
        return <h4>Event Details</h4>;
    }
  };

  return (
    <div>
      <div className="tab-container">{eventHeader}</div>
      {activeContent(activeTab)}
    </div>
  );
};

export default MeetingAllEvents;
