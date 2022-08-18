import React, { useState, useContext } from "react";
import styles from "./style.module.scss";
import { UserContext } from "./../../../../app/state/contexts/userContext";
import { app, db } from "./../../../../app/firebase/config";
import { getDoc, setDoc, doc } from "firebase/firestore";
function Settings() {
  const [state, dispatch] = useContext(UserContext);
  const [successMsg, setSuccessMsg] = useState(false);
  const [data, setData] = useState({
    name: state.userData.name ? state.userData.name : "",
    email: state.userData.email ? state.userData.email : "",
    phone: state.userData.phone ? state.userData.phone : "",
  });
  async function saveChanges() {
    const docRef = doc(db, "users", localStorage.getItem("uad-cache"));
    const snapShot = await getDoc(docRef);
    let user_data = snapShot.data();
    user_data = { ...user_data, name: data.name, phone: data.phone };
    await setDoc(docRef, user_data);
    dispatch({ type: "update_user_data", payload: user_data });
    setSuccessMsg(true);
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Settings</h2>
      </div>
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
        <input type="text" value={data.email} disabled />
      </div>
      <div className={styles.input}>
        <label>Phone Number</label>
        <input
          type="text"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
      </div>
      {successMsg ? (
        <p style={{ color: "green", fontSize: "12px" }}>
          Profile data updated!
        </p>
      ) : (
        ""
      )}
      <div className={styles.btnDiv}>
        <button className={styles.saveBtn} onClick={saveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
export default Settings;
