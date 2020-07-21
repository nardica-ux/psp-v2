import React from "react";
import UserProfileAva from "./user-profile-ava";
import "./user-styles.scss";
import { Link } from "react-router-dom";

import UserBio from "./user-bio";
import UserMoto from "./user-moto";
import Routes from "../../components/app/routes";

const UserAboutSelf = ({ currentUser }) => {
  const { moto, id, about, displayName, type } = currentUser;

  return (
    <div className="user-about-box">
      <h3 style={{ display: "inline-block", marginRight: "auto" }}>
        {displayName} // type: {type} / {"  "}
      </h3>
      {type === "admin"
        ? Routes.map((route) => (
            <Link className={route.class} to={route.path} key={route.key}>
              {route.key}
            </Link>
          ))
        : null}
      <div className="user-about-top">
        <UserProfileAva />
        <UserMoto moto={moto} id={id} />
      </div>
      <UserBio about={about} id={id} />
    </div>
  );
};
export default UserAboutSelf;
