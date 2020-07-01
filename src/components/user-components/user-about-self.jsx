import React from "react";
import UserProfileAva from "./user-profile-ava";

import UserBio from "./user-bio";
import UserMoto from "./user-moto";

const UserAboutSelf = ({ currentUser, setEdit }) => {
  const { moto, id, about, displayName, type } = currentUser;

  return (
    <div className="user-about-box">
      <h3 style={{ display: "inline-block" }}>
        profile {displayName} // type: {type}
      </h3>
      {type === "admin" ? (
        <button className="main" onClick={() => setEdit(id)}>
          User Table
        </button>
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
