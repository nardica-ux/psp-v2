import React, { useState } from "react";
import { connect } from "react-redux";
import "./evaluation-block.scss";

const EvaluationForm = () => {
  const [difficulty, set_difficulty] = useState(10);
  const [intensity, set_intensity] = useState(10);
  const [unity, set_unity] = useState(10);
  const [value, set_value] = useState(10);

  return (
    <form className="evaluation-form">
      <label for="difficulty">
        Evaluate the level of difficulty of this meeting
      </label>
      <br />
      <input
        name={"difficulty"}
        type="range"
        value={difficulty}
        min="0"
        max="20"
        onChange={(e) => set_difficulty(e.target.value)}
      />
      <br />
      <label for="intensity">Evaluate the level of intensity of work </label>
      <br />
      <input
        type="range"
        value={intensity}
        min="0"
        max="20"
        onChange={(e) => set_intensity(e.target.value)}
      />
      <br />
      <label for="unity">
        Evaluate the feel of unity you had last time on meeting
      </label>
      <br />
      <input
        type="range"
        value={unity}
        min="0"
        max="20"
        onChange={(e) => set_unity(e.target.value)}
      />
      <br />
      <label for="value">
        Evaluate the overall level of value from this meeting
      </label>
      <br />
      <input
        type="range"
        value={value}
        min="0"
        max="20"
        onChange={(e) => set_value(e.target.value)}
      />
      <div>
        <button className="secondary" type="button">
          Close
        </button>
        <button
          className="main"
          type="button"
          onClick={() => console.log({ unity, difficulty, value, intensity })}
        >
          Send
        </button>
      </div>
    </form>
  );
};
export default connect(null)(EvaluationForm);
