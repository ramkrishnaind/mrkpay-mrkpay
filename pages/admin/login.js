import React, { useState, useContext, useEffect } from "react";
import styles from "../signup/style.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import { GetAdminContext } from "../../app/state/contexts/adminContext";
import Link from "next/link";
const initialData = {
  username: "",
  password: "",
};
function AdminLogin() {
  const router = useRouter();
  const [state, dispatch] = useContext(GetAdminContext);
  const [data, setData] = useState(initialData);
  const [errMsg, setErrMsg] = useState(false);
  function handleSignIn() {
    setErrMsg(false);
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/xadmin";
    axios
      .post(url, data)
      .then((res) => {
        // debugger;
        if (res.data.status == "success") {
          dispatch({ type: "login" });
          router.push("/admin/dashboard");
        } else {
          setErrMsg(true);
        }
      })
      .catch((err) => {
        setErrMsg(true);
        return;
      });
  }
  return (
    <div className={styles.app}>
      <div
        className={`${styles.container} md:min-h-[80vh] `}
        onKeyDown={(e) => (e.key == "Enter" ? handleSignIn() : "")}
      >
        <h2>Welcome to MRKPAY Admin Console</h2>
        <div className={styles.input}>
          <label>Username</label>
          <input
            type="text"
            value={data["username"]}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </div>
        <div className={styles.input}>
          <label>Password</label>
          <input
            type="password"
            value={data["password"]}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        {errMsg ? (
          <p
            className={styles.error}
            style={{ color: "red", margin: 5, fontSize: "12px" }}
          >
            Sorry! You can not login yet.
          </p>
        ) : (
          ""
        )}
        {/* <Link href="/admin/dashboard"> */}
        <button className={styles.loginBtn} onClick={handleSignIn}>
          Log in
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default AdminLogin;
