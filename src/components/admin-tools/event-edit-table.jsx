import React, { useState } from "react";
import { connect } from "react-redux";
import EventTableRow from "./event-table-row";
import "./event-table-styles.scss";
import AddEvent from "../event-components/event-add.component";

const EventEditTable = ({ eventsData, meeting_id, meetings, num }) => {
  const [addingNew, setAdding] = useState(false);
  const thisEventsArr = () => {
    let rows = [];
    for (let event in eventsData[meeting_id])
      rows.push(eventsData[meeting_id][event]);
    return rows;
  };
  const [thisMeetingEvents, setEvents] = useState(thisEventsArr());
  const [nextEvent, setNext] = useState(null);
  const [eventsArray, setEventsArray] = useState(thisMeetingEvents);
  const [activeSort, setSort] = useState(false);

  const chronoSort = (type) => {
    let chrono = [...thisMeetingEvents].sort(function(a, b) {
      let aa = new Date(a.stamp).valueOf();
      let bb = new Date(b.stamp).valueOf();
      return type > 0 ? aa - bb : bb - aa;
    });
    setEventsArray(chrono);
    let elem = {};
    type > 0
      ? (elem = chrono.find(
          (el) => new Date(el.stamp).valueOf() > new Date().valueOf()
        ))
      : (elem = chrono.find(
          (el) => new Date(el.stamp).valueOf() < new Date().valueOf()
        ));
    setNext(type > 0 ? chrono.indexOf(elem) : chrono.indexOf(elem) - 1);
    setSort(type > 0 ? "from_past" : "from_newest");
  };

  const onlyPast = () => {
    let onlyPast = [...thisMeetingEvents].filter(
      (event) => new Date().valueOf() > new Date(event.stamp).valueOf()
    );
    setNext(false);
    setEventsArray(onlyPast);
    setSort("only_past");
  };
  const onlyFuture = () => {
    let onlyFuture = [...thisMeetingEvents].filter(
      (event) => new Date().valueOf() < new Date(event.stamp).valueOf()
    );
    setNext(false);
    setEventsArray(onlyFuture);
    setSort("only_future");
  };

  if (!eventsData) return null;

  return (
    <table className="event-table">
      <tr>
        <td colSpan="3">
          <h3>{meetings[num].title}</h3>
        </td>
        <td colSpan="5">
          <button
            type="button"
            className={activeSort === "from_past" ? "main" : "secondary"}
            onClick={() => chronoSort(1)}
          >
            Past to Future
          </button>
          <button
            type="button"
            className={activeSort === "from_newest" ? "main" : "secondary"}
            onClick={() => chronoSort(-1)}
          >
            Future to Past
          </button>
          <button
            type="button"
            className={activeSort === "only_past" ? "main" : "secondary"}
            onClick={() => onlyPast()}
          >
            Past Only
          </button>
          <button
            type="button"
            className={activeSort === "only_future" ? "main" : "secondary"}
            onClick={() => onlyFuture()}
          >
            Upcoming
          </button>
        </td>
        <td style={{ position: "relative" }}>
          <AddEvent meeting_id={meeting_id} />
        </td>
      </tr>
      <tbody>
        {eventsArray.map((el, i) => (
          <EventTableRow
            data={el}
            key={el.event_id + "-table-" + i}
            next={i === nextEvent ? true : false}
          />
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => ({
  eventsData: state.events.eventsData,
  meetings: state.meetings.meetings,
});

export default connect(mapStateToProps)(EventEditTable);
