import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./admin-styles.scss";
import { admin_update_user } from "../../redux/users/user-actions";

const UserTableLine = ({ data, i, admin_update_user }) => {
  const [editing, startEditing] = useState(false);
  const [userUpdate, startUpdate] = useState(data);

  //   const handleEdit = (e) => {
  //     console.log(e.target.closest("tr").id);
  //   };
  const tableEdit = (
    <tr
      key={userUpdate.id + "***" + i}
      id={userUpdate.id + "***" + i}
      className={"edit-row"}
    >
      <td style={{ width: 70 }}>
        <button
          className="secondary"
          type="button"
          onClick={() => startEditing(false)}
        >
          Close
        </button>
        <button
          className="main"
          type="button"
          onClick={() => admin_update_user(userUpdate)}
        >
          Save
        </button>
      </td>
      <td>
        <input
          type="text"
          name="displayName"
          value={userUpdate.displayName || ""}
          onChange={(e) =>
            startUpdate({ ...userUpdate, displayName: e.target.value })
          }
        />
      </td>
      <td>{userUpdate.email}</td>
      <td>
        <input
          type="text"
          name="type"
          value={userUpdate.type || ""}
          onChange={(e) => startUpdate({ ...userUpdate, type: e.target.value })}
        />
      </td>
      <td>
        <input
          type="text"
          style={{ width: 300 }}
          name="moto"
          value={userUpdate.moto || ""}
          onChange={(e) => startUpdate({ ...userUpdate, moto: e.target.value })}
        />
      </td>
      <td>
        {typeof userUpdate.lastLogged === "object"
          ? Object.values(userUpdate.lastLogged)[0] || ""
          : userUpdate.lastLogged || ""}
      </td>
    </tr>
  );

  const tableLine = (
    <tr
      key={userUpdate.id + "***" + i}
      id={userUpdate.id + "***" + i}
      className={i % 2 === 0 ? "even-row" : "odd-row"}
    >
      <td style={{ width: 70 }}>
        <button className="secondary" onClick={() => startEditing(true)}>
          edit
        </button>
      </td>
      <td>{userUpdate.displayName}</td>
      <td>{userUpdate.email}</td>
      <td>{userUpdate.type}</td>
      <td style={{ width: 300 }}>{userUpdate.moto}</td>
      <td>
        {typeof userUpdate.lastLogged === "object"
          ? Object.values(userUpdate.lastLogged)[0]
          : userUpdate.lastLogged}
      </td>
    </tr>
  );

  return editing ? tableEdit : tableLine;
};
const mapDispatchToProps = (dispatch) => {
  return {
    admin_update_user: (obj) => dispatch(admin_update_user(obj)),
  };
};
export default connect(null, mapDispatchToProps)(UserTableLine);
