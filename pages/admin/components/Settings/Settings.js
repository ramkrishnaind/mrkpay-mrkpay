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
    <div className={`w-100 items-center`}>
      <h3 className="text-center mx-auto text-lg my-3">Admin Settings</h3>
      <div className={`mx-auto w-2/5 px-2 py-2 flex justify-between`}>
        <label>Username</label>
        <input
          type="text"
          value={data.username}
          className={"border-2 border-gray-300 px-3 py-2 rounded-lg "}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
      </div>
      <div className={`mx-auto  w-2/5 px-2 py-2 flex justify-between`}>
        <label>Password</label>
        <input
          type="password"
          value={data.password}
          className={"border-2 border-gray-300 px-3 py-2 rounded-lg "}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
      <div className={`mx-auto w-2/5 px-2 py-2 flex justify-between`}>
        <label>Secret Key</label>
        <input
          type="password"
          value={data.secret}
          className={"border-2 border-gray-300 px-3 py-2 rounded-lg "}
          onChange={(e) => setData({ ...data, secret: e.target.value })}
        />
      </div>
      {successMsg ? (
        <div className={`mx-auto w-2/5 px-2 py-2`}>
          <p className={styles.successMsg}>Admin credentials updated.</p>
        </div>
      ) : (
        ""
      )}
      <div className={`mx-auto w-2/5 px-2 py-2 flex justify-end`}>
        <button className={`${styles.btn}`} onClick={updateAdmin}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;
