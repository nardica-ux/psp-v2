import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout_user_start } from "../../redux/users/user-actions";

const UserTopBlock = ({
  currentUser: { displayName, id },
  logout_user_start,
}) => {
  let initials = [];
  if (displayName) initials = displayName.split(" ");
  let thisName = initials.map((el) => el.split("")[0]);
  return (
    <button style={{ color: "white", marginLeft: "auto" }}>
      <Link className="ava-user" to={"user/"}>
        {initials ? thisName.join("") : null}
      </Link>
      <button className="secondary" onClick={() => logout_user_start({ id })}>
        Sign Out
      </button>
    </button>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout_user_start: (user) => dispatch(logout_user_start(user)),
  };
};
export default connect(null, mapDispatchToProps)(UserTopBlock);
