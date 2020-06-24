import React from "react";
import { connect } from "react-redux";
import "./evaluation-block.scss";

function EvaluationHeader({ meeting_id, tab, handleTab }) {
  console.log(tab);
  return (
    <div className="eval-tab-div">
      <div
        className={tab === 0 ? "eval-tab-active" : "eval-tab"}
        onClick={() => handleTab(0)}
      >
        Evaluation Summary
      </div>
      <div
        className={tab === 1 ? "eval-tab-active" : "eval-tab"}
        onClick={() => handleTab(1)}
      >
        Add New Evaluation
      </div>
      <div
        className={tab === 2 ? "eval-tab-active" : "eval-tab"}
        onClick={() => handleTab(2)}
      >
        Best Quotes
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  // evalTabs: state.evaluations.evalTabs,
});
const mapDispatchToProps = (dispatch) => {
  return {
    // addNewEvaluation
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EvaluationHeader);
