import React, { useState } from "react";
import { connect } from "react-redux";

import EvaluationForm from "./evaluation-form.component";
import EvaluationHeader from "./evaluation-tab-header";
import EvaluationSummary from "./evaluation-summary.component";
import EvaluationsQuotes from "./evaluation-quotes.component";

function EvaluationBlock({ meeting_id, evaluations }) {
  const [tab, setTab] = useState(0);
  //   const { evaluationData, evalTabs } = evaluations;
  const handleTab = (num) => setTab(num);

  const tabContent = (num) => {
    switch (num) {
      case 0:
        return (
          <EvaluationSummary
            meeting_id={meeting_id}
            summary={"hello from suammry"}
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
      <EvaluationHeader meeting_id={meeting_id} handleTab={handleTab} />
      {tabContent(tab)}
    </div>
  );
}
const mapStateToProps = (state) => ({
  //   evaluations: state.evaluations,
});
export default connect(mapStateToProps)(EvaluationBlock);
