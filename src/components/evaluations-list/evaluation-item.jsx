import React, { useState } from "react";
import PropTypes from "prop-types";
import { delete_eval_async } from "../../redux/evaluations/evaluation-actions";
import { connect } from "react-redux";
import "./evaluation-block.scss";

const EvaluationItem = ({
  meeting_id,
  delete_eval_async,
  intensity,
  totvalue,
  review,
  diff,
  unity,
  id,
  showDigits,
  showDiff,
  showValue,
  showIntens,
  showUnity,
}) => {
  const [toggleDia, setDia] = useState(false);
  const handleDel = (obj) => {
    delete_eval_async(obj);
  };
  const dialog = () => (
    <dialog open={toggleDia ? "open" : false} className="chart-popup">
      <p>User Name: Sally Cooper</p>
      <p>Review text: {review || "here goes review text when exists"}</p>
      <p>
        Diff:{diff} | Unity:{unity}| Intens: {intensity}| Value:{totvalue}
      </p>
      <button onClick={() => handleDel({ meeting_id, id })}>Del</button>
    </dialog>
  );

  return (
    <span
      className="chart-column"
      onMouseOver={() => setDia(true)}
      onMouseOut={() => setDia(false)}
      style={
        toggleDia
          ? {
              border: "2px solid orange",
              opacity: 1,
            }
          : { opacity: 0.8 }
      }
    >
      <div
        className="chart-item"
        style={
          showDiff
            ? {
                height: diff * 6 + 120,
                backgroundColor: "slateblue",
              }
            : {
                display: "none",
              }
        }
      >
        {showDigits ? diff : null}
      </div>
      <div
        className="chart-item"
        style={
          showUnity
            ? {
                height: unity * 5 + 60,
                backgroundColor: "orange",
              }
            : { display: "none" }
        }
      >
        {showDigits ? unity : null}
      </div>
      <div
        className="chart-item"
        style={
          showIntens
            ? {
                height: intensity * 4 + 40,
                backgroundColor: "lightseagreen",
              }
            : { display: "none" }
        }
      >
        {showDigits ? intensity : null}
      </div>
      <div
        className="chart-item"
        style={
          showValue
            ? {
                height: totvalue * 4,
                backgroundColor: "orangered",
              }
            : { display: "none" }
        }
      >
        {showDigits ? totvalue : null}
      </div>
      {dialog()}
    </span>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    delete_eval_async: (obj) => dispatch(delete_eval_async(obj)),
  };
};
export default connect(null, mapDispatchToProps)(EvaluationItem);
