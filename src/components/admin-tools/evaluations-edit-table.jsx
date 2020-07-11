import React from "react";
import { connect } from "react-redux";
import "./admin-styles.scss";
import EvalsTableRow from "./evals-table-row";

const EvalsEditTable = ({ evaluationData }) => {
  let output = [];
  for (let key in evaluationData) {
    output = [...output, ...evaluationData[key]];
  }

  return (
    <table style={{ border: "1px solid grey", margin: "auto" }}>
      <thead>
        <tr>
          <th> Meeting </th>
          <th> User email </th>
          <th> Event ID </th>
          <th> review </th>
          <th> created </th>
          <th> difficulty </th>
          <th> intensity </th>
          <th> unity </th>
          <th> valueTotal </th>
          <th> delete </th>
        </tr>
      </thead>
      <tbody>
        {output.map((el, i) => (
          <EvalsTableRow data={el} index={i} />
        ))}
      </tbody>
    </table>
  );
};
const mapStateToProps = (state) => ({
  evaluationData: state.evaluations.evaluationData,
});
export default connect(mapStateToProps)(EvalsEditTable);
