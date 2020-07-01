import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./evaluation-block.scss";

import {
  post_new_eval_async,
  set_posted_success,
} from "../../redux/evaluations/evaluation-actions";

const EvaluationForm = ({
  post_new_eval_async,
  meeting_id,
  evaluationStatus,
  set_posted_success,
  currentUser,
}) => {
  const [status, setStatus] = useState(false);

  const [difficulty, set_difficulty] = useState(10);
  const [intensity, set_intensity] = useState(10);
  const [unity, set_unity] = useState(10);
  const [valueTotal, set_value] = useState(10);
  const [review, setReview] = useState("");
  const user_id = currentUser.id;
  const user_email = currentUser.email;

  // useEffect(() => {
  //   console.log("useEffect called");
  //   return () => {
  //     setTimeout(function() {
  //       set_posted_success();
  //     }, 2000);
  //     setStatus(false);
  //   };
  // }, [status]);

  return status ? (
    <div>
      ... Being posted, wait ...
      <button onClick={() => setStatus(false)}>Continue</button>
    </div>
  ) : (
    <form className="evaluation-form">
      <label htmlFor="difficulty">
        Evaluate the level of difficulty of work
      </label>
      <br />
      <input
        type="range"
        value={difficulty}
        min="0"
        max="20"
        onChange={(e) => set_difficulty(e.target.value)}
      />
      <br />

      <label htmlFor="intensity">Evaluate the level of intensity of work</label>
      <br />
      <input
        type="range"
        value={intensity}
        min="0"
        max="20"
        onChange={(e) => set_intensity(e.target.value)}
      />
      <br />
      <label htmlFor="unity">
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
      <label htmlFor="value">
        Evaluate the overall level of value from this meeting
      </label>
      <br />
      <input
        type="range"
        value={valueTotal}
        min="0"
        max="20"
        onChange={(e) => set_value(e.target.value)}
      />
      <br />
      <label htmlFor="review">
        Evaluate the overall level of value from this meeting
      </label>
      <br />
      <input
        name="review"
        type="text"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <div>
        <button className="secondary" type="button">
          Close
        </button>
        <button
          className="main"
          type="button"
          onClick={() => {
            setStatus(false);
            post_new_eval_async({
              unity,
              difficulty,
              valueTotal,
              intensity,
              meeting_id,
              review,
              user_id,
              user_email,
            });
          }}
        >
          Send
        </button>
      </div>
    </form>
  );
};
const mapStateToProps = (state) => ({
  evaluationStatus: state.evaluations.isPosting,
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    post_new_eval_async: (obj) => dispatch(post_new_eval_async(obj)),
    set_posted_success: () => dispatch(set_posted_success()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EvaluationForm);
