import React, { useState } from "react";
import styles from "./style.module.scss";
import axios from "axios";
function Settings() {
  const [data, setData] = useState({ username: "", password: "", secret: "" });
  const [successMsg, setSuccessMsg] = React.useState(false);
  function updateAdmin() {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/xadmin";
    axios.put(url, data).then((res) => {
      if (res.data.status == "success") {
        setSuccessMsg(true);
        setData({ username: "", password: "", secret: "" });
      }
    });
  }
  return (
    <div className={styles.container}>
      <h3>Admin Settings</h3>
      <div className={styles.input}>
        <label>Username</label>
        <input
          type="text"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
      </div>
      <div className={styles.input}>
        <label>Password</label>
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
      <div className={styles.input}>
        <label>Secret Key</label>
        <input
          type="password"
          value={data.secret}
          onChange={(e) => setData({ ...data, secret: e.target.value })}
        />
      </div>
      {successMsg ? (
        <p className={styles.successMsg}>Admin credentials updated.</p>
      ) : (
        ""
      )}
      <button className={styles.btn} onClick={updateAdmin}>
        Save Changes
      </button>
    </div>
  );
}

export default Settings;
