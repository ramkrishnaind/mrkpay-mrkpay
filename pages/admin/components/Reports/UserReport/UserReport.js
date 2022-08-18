import React, { useState } from "react";
import styles from "./style.module.scss";
function UserReport({ users }) {
  const [filtereData, setFilteredData] = useState([]);
  if (filtereData.length > 0) {
    return <h1>Filtered Data</h1>;
  }
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
          <td>Created At</td>
        </thead>
        <tbody>
          {users ? (
            users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.data.name}</td>
                  <td>{user.data.email}</td>
                  <td>{user.data.phone ? user.data.phone : "N/A"}</td>
                  <td>{user.data.createdAt ? user.data.createdAt : "N/A"}</td>
                </tr>
              );
            })
          ) : (
            <h3>Loading...</h3>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserReport;
