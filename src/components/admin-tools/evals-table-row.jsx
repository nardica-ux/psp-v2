import React from "react";
import { connect } from "react-redux";
import "./admin-styles.scss";
import { delete_eval_async } from "../../redux/evaluations/evaluation-actions";

const EvalsTableRow = ({ data, delete_eval_async }) => {
  const {
    difficulty,
    intensity,
    unity,
    valueTotal,
    meeting_id,
    evaluation_id,
    user_email,
    review,
    event_id,
    createdAt,
  } = data;
  let todate = Date(createdAt.seconds);
  return (
    <tr>
      <td> {meeting_id}</td>
      <th> {user_email} </th>
      <th> {event_id} </th>
      <th> {review} </th>
      <th> {todate} </th>
      <td> {difficulty}</td>
      <td> {intensity}</td>
      <td> {unity}</td>
      <td> {valueTotal}</td>
      <td>
        <button
          className="main"
          onClick={() => delete_eval_async({ id: evaluation_id, meeting_id })}
        >
          Del
        </button>
      </td>
    </tr>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    delete_eval_async: (obj) => dispatch(delete_eval_async(obj)),
  };
};
export default connect(null, mapDispatchToProps)(EvalsTableRow);
