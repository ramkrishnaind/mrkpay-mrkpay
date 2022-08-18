import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { UserContext } from "./../../app/state/contexts/userContext";
import UserInfoForm from "./UserInfoForm/UserInfoForm";
import UserDashboard from "./UserDashboard/UserDashboard";
import { doc, getDoc } from "firebase/firestore";
import { app, db } from "./../../app/firebase/config";
function LoginStack() {
  const [state, dispatch] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  // function encryptUser(ud) {
  //   const rb = (Math.random() * 1000).toString(36);
  //   const ra = (Math.random() * 1000).toString(36);
  //   const ch = rb + ud + ra;
  //   return ch;
  // }
  // function decryptUser(hash) {
  //   let ch = "";
  //   for (let i = 12; i < hash.length - 12; i++) {
  //     ch += hash[i];
  //   }
  //   return ch;
  // }
  useEffect(() => {
    (async function () {
      let uid = null;
      const hash = localStorage.getItem("uad-cache");
      if (hash) {
        uid = hash;
      } else if (state.userData != null) {
        uid = state.userData.uid;
      }
      if (uid == null) {
        return;
      }
      const docRef = doc(db, "users", uid);
      const snapShot = await getDoc(docRef);
      const posts = await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/posts");
      const postsData = await posts.json();
      dispatch({ type: "setposts", payload: postsData.data });
      if (snapShot.exists()) {
        setNewUser(true);
        dispatch({ type: "update_user_data", payload: snapShot.data() });
        return;
      } else {
        setNewUser(true);
      }
    })();
  }, []);

  if (state.loggedIn) {
    return <UserDashboard />;
  } else {
    return <h2>Error Logging in</h2>;
  }
}

export default LoginStack;
