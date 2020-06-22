import React, { useState } from "react";
import { connect } from "react-redux";
import { setEvaluationTab } from "../../redux/evaluations/evaluation-actions";

function EvaluationHeader({ meeting_id, tab, handleTab }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div onClick={() => handleTab(0)}> Evaluation Summary |</div>
      <div onClick={() => handleTab(1)}> Add New Evaluation |</div>
      <div onClick={() => handleTab(2)}> Best Quotes </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  //   evalTabs: state.evaluations.evalTabs,
});
const mapDispatchToProps = (dispatch) => {
  return {
    // setEvaluationTab: (obj) => dispatch(setEvaluationTab(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EvaluationHeader);
