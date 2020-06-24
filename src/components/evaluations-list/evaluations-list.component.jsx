import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import EvaluationForm from "./evaluation-form.component";
import EvaluationHeader from "./evaluation-tab-header";
import EvaluationSummary from "./evaluation-summary.component";
import EvaluationsQuotes from "./evaluation-quotes.component";
import { setEvaluationTab } from "../../redux/evaluations/evaluation-actions";

function EvaluationBlock({ meeting_id, evaluations, setEvaluationTab }) {
  const { evaluationData, evalTabs } = evaluations;
  const [tab, setTab] = useState(evalTabs[meeting_id]);

  const handleTab = (num) => {
    setTab(num);
    setEvaluationTab({ num, meeting_id });
  };

  const tabContent = (num) => {
    switch (num) {
      case 0:
        return (
          <EvaluationSummary
            meeting_id={meeting_id}
            summary={evaluationData ? evaluationData[meeting_id] : []}
            tab={tab}
          />
        );
      case 1:
        return <EvaluationForm meeting_id={meeting_id} />;
      case 2:
        return <EvaluationsQuotes meeting_id={meeting_id} />;
    }
  };

  return (
    <div>
      <EvaluationHeader
        meeting_id={meeting_id}
        handleTab={handleTab}
        tab={tab}
      />
      {tabContent(tab)}
    </div>
  );
}
EvaluationBlock.propTypes = {
  meeting_id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  evaluations: state.evaluations,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setEvaluationTab: (obj) => dispatch(setEvaluationTab(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EvaluationBlock);
