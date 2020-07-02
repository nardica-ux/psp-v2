import React from "react";
import UserProfileAva from "./user-profile-ava";
import { Link } from "react-router-dom";

import UserBio from "./user-bio";
import UserMoto from "./user-moto";

const UserAboutSelf = ({ currentUser }) => {
  const { moto, id, about, displayName, type } = currentUser;

  return (
    <div className="user-about-box">
      <h3 style={{ display: "inline-block", marginRight: "auto" }}>
        profile {displayName} // type: {type}
      </h3>
      {type === "admin" ? (
        <Link style={{ color: "slateblue" }} to="/usertable">
          User Table
        </Link>
      ) : null}
      <div className="user-about-top">
        <UserProfileAva />
        <UserMoto moto={moto} id={id} />
      </div>
      <UserBio about={about} id={id} />
    </div>
  );
};
export default UserAboutSelf;
