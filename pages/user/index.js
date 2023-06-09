import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "./../../styles/Home.module.scss";
import Header from "./../../components/Header/Header";
import LoginStack from "./../../components/LoginStack/LoginStack";
import LogoutStack from "./../../components/LogoutStack/LogoutStack";
import { UserContext } from "./../../app/state/contexts/userContext";
import { getCookie, setCookie } from "cookies-next";
import { doc, getDoc } from "firebase/firestore";
import { app, db } from "../../app/firebase/config";

export default function Home() {
  const [state, dispatch] = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(undefined);
  useEffect(() => {
    (async function () {
      const hash = localStorage.getItem("uad-cache");
      if (hash) {
        const uid = hash;
        const docRef = doc(db, "users", uid);
        console.log("Fetching data using id...");
        const val = await getDoc(docRef);
        console.log("Fetching data using id...Complete");
        dispatch({ type: "update_user_data", payload: val.data() });
      }
    })();
  }, []);
  useEffect(() => {
    setLoggedIn(state.loggedIn);
  }, [state.loggedIn]);
  const [id, setId] = useState("");
  useEffect(() => {
    setId(localStorage.getItem("uad-cache"));
    if (getCookie("token")) {
      dispatch({ type: "redirect-dashboard" });
      setTimeout(() => {
        setCookie("token", null);
        dispatch({ type: "redirect-dashboard-false" });
      }, 1000);
    }
    if (!localStorage.getItem("uad-cache")) {
      dispatch({ type: "logout" });
    }
    console.log("State in user index:", state);
  }, []);
  debugger;
  if (loggedIn == undefined) {
    return <></>;
  }
  return (
    <div>
      <Head>
        <title>MRKPay.com</title>
        <meta name="description" content="MRKPay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <div className={styles.app}>
          {!loggedIn ? <LogoutStack setUserData={dispatch} /> : <LoginStack />}
        </div>
      </main>
    </div>
  );
}
