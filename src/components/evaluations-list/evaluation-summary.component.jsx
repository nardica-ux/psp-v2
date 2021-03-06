import React, { useState } from "react";

import "./evaluation-block.scss";
import { connect } from "react-redux";
import { colors } from "./eval-color";

import EvaluationItem from "./evaluation-item";

const EvaluationSummary = ({ meeting_id, event_id, evaluationData }) => {
  const newLine = (arr, prop) => {
    if (!arr.length) return [];
    return arr.map((el) => el[prop]);
  };
  let summary = [];
  if (evaluationData[meeting_id] && evaluationData[meeting_id][event_id])
    summary = [...evaluationData[meeting_id][event_id]];

  const [showDigits, setShowDigits] = useState(false);
  const [showDiff, setShowDiff] = useState(true);
  const [showUnity, setShowUnity] = useState(true);
  const [showIntens, setShowIntens] = useState(true);
  const [showValue, setShowValue] = useState(true);
  console.log(summary);
  if (!summary) return null;
  let newDiff = newLine(summary, "difficulty");
  let newUnity = newLine(summary, "unity");
  let newValue = newLine(summary, "valueTotal");
  let newIntensity = newLine(summary, "intensity");
  let newReview = newLine(summary, "review");
  let idArr = newLine(summary, "evaluation_id");

  const output = () => {
    if (summary.length) {
      return newDiff.map((el, i) => (
        <EvaluationItem
          showDigits={showDigits}
          diff={el}
          intensity={newIntensity[i]}
          unity={newUnity[i]}
          totvalue={newValue[i]}
          review={newReview[i] || null}
          meeting_id={meeting_id}
          showDiff={showDiff}
          showUnity={showUnity}
          showIntens={showIntens}
          showValue={showValue}
          id={idArr[i] || "someId"}
        />
      ));
    }
  };

  return (
    <React.Fragment>
      <form className="chart-legend">
        <label htmlFor="numbers">show numbers</label>
        <input
          type="checkbox"
          name="numbers"
          onChange={() => setShowDigits(!showDigits)}
        />
        <span
          className="input-backdrop"
          style={{
            backgroundColor: colors.difficulty,
            color: "white",
          }}
        >
          <label htmlFor="showdiff">Difficulty</label>
          <input
            type="checkbox"
            name="showdiff"
            checked={showDiff}
            onChange={() => setShowDiff(!showDiff)}
          />
        </span>

        <span
          className="input-backdrop"
          style={{ backgroundColor: colors.unity }}
        >
          <label htmlFor="showUnity">Unity</label>
          <input
            type="checkbox"
            name="showUnity"
            checked={showUnity}
            onChange={() => setShowUnity(!showUnity)}
          />
        </span>

        <span
          className="input-backdrop"
          style={{ backgroundColor: colors.intensity }}
        >
          <label htmlFor="numbers">Intensity</label>
          <input
            type="checkbox"
            name="showIntens"
            checked={showIntens}
            onChange={() => setShowIntens(!showIntens)}
          />
        </span>

        <span
          className="input-backdrop"
          style={{ backgroundColor: colors.totalvalue }}
        >
          <label htmlFor="showValue">TotalValue</label>
          <input
            type="checkbox"
            name="showValue"
            checked={showValue}
            onChange={() => setShowValue(!showValue)}
          />
        </span>
      </form>
      <div className="chart-table">{output()}</div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  evaluationData: state.evaluations.evaluationData,
});
const mapDispatchToProps = (dispatch) => {
  return {
    // delete_eval_async: (obj) => dispatch(delete_eval_async(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationSummary);
