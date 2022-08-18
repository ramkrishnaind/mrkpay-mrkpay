import React, { useState } from "react";
import ContentArea from "../components/Content/ContentArea";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./style.module.scss";
function UserDashboard() {
  const [currentScreen, setCurrentScreen] = useState("home");
  return (
    <div className={styles.container}>
      <Sidebar setCurrentScreen={setCurrentScreen} />
      <ContentArea currentScreen={currentScreen} />
    </div>
  );
}

export default UserDashboard;
