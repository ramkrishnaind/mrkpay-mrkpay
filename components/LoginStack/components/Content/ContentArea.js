import React, { useContext } from "react";
import styles from "./style.module.scss";
import Home from "./../Home/Home";
import Notifications from "./../Notifications/Notifications";
import Wallet from "./../Wallet/Wallet";
import Settings from "./../Settings/Settings";
import { UserContext } from "./../../../../app/state/contexts/userContext";
function ContentArea({ currentScreen }) {
  const [state, dispatch] = useContext(UserContext);
  return (
    <div className={styles.container}>
      {currentScreen === "home" && <Home data={state.userData} />}
      {currentScreen === "noti" && <Notifications />}
      {currentScreen === "wallet" && <Wallet />}
      {currentScreen === "settings" && <Settings />}
    </div>
  );
}

export default ContentArea;
