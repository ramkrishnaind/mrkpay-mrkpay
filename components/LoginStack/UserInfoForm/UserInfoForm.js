import React, { useState } from "react";
import styles from "./style.module.scss";
function UserInfoForm({ userDetails }) {
  const [data, setData] = useState({
    name: userDetails.name ? userDetails.name : "",
    email: userDetails.email ? userDetails.email : "",
    phone: "",
  });
  function saveChanges() {
    userDetails.dispatch({ type: "update_remote_user", payload: data });
    userDetails.setNewUser(false);
  }
  return (
    <div className={styles.container}>
      <h2>Account Created Successfully ✔️</h2>
      <h3>Please complete your profile to start earning🤑 with MRKPAY</h3>
      <div className={styles.input}>
        <label>Full Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>
      <div className={styles.input}>
        <label>Email</label>
        <input
          disabled
          type="text"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </div>
      <div className={styles.input}>
        <label>Phone Number</label>
        <input
          type="text"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
      </div>
      <div className={styles.btnDiv}>
        <button className={styles.saveBtn} onClick={saveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default UserInfoForm;
