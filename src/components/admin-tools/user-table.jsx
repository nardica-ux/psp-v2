import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getBase } from "../../firebase/firebase.utils";
import "./admin-styles.scss";
import UserTableLine from "./user-table-line";

const UserEditTable = () => {
  const [userList, setUserList] = useState([]);

  useEffect(async () => {
    let list = await getBase("users");
    setUserList(list);
  }, []);

  return userList.length ? (
    <table className="user-table">
      <thead>
        <tr>
          <th>edit</th>
          <th>name</th>
          <th>email</th>
          <th>type</th>
          <th>moto</th>
          <th>lastLogged</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((el, i) => (
          <UserTableLine data={el} i={i} />
        ))}
      </tbody>
    </table>
  ) : null;
};
const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});

export default connect(mapStateToProps)(UserEditTable);
