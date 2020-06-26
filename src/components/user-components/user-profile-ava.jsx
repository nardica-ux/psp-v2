import React from "react";

export const UserProfileAva = () => (
  <div className="user-profile-ava">edit pict</div>
);

export const UserMoto = ({ moto }) => (
  <div>
    {moto}
    <button className="secondary">edit</button>
  </div>
);

export const UserBio = ({ bio }) => (
  <div>
    {bio}
    <button className="secondary">edit</button>
  </div>
);
