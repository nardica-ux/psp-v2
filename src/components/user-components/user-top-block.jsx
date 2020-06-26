import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout_user_start } from "../../redux/users/user-actions";

const UserTopBlock = ({
  currentUser: { displayName, id },
  logout_user_start,
}) => {
  let name = displayName.split(" ");
  name.forEach((el) => el.split("")[0]);
  let initials = name.join("");
  return (
    <div style={{ color: "white", marginLeft: "auto" }}>
      <Link className="ava-user" to={`user/profile`}>
        {initials}
      </Link>
      <button className="secondary" onClick={logout_user_start}>
        Sign Out
      </button>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout_user_start: () => dispatch(logout_user_start()),
  };
};
export default connect(null, mapDispatchToProps)(UserTopBlock);
