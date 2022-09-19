import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import Home from "./../Home/Home";
import Notifications from "./../Notifications/Notifications";
import Wallet from "./../Wallet/Wallet";
import Settings from "./../Settings/Settings";
import { UserContext } from "./../../../../app/state/contexts/userContext";
function ContentArea({ currentScreen }) {
  const [state, dispatch] = useContext(UserContext);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 10);
  }, []);
  return (
    <div className={styles.container}>
      {state.redirectToDashboard ? (
        <Notifications />
      ) : (
        <>
          {currentScreen === "home" && !load && <Home data={state.userData} />}
          {currentScreen === "noti" && <Notifications />}
          {currentScreen === "wallet" && <Wallet />}
          {currentScreen === "settings" && <Settings />}
        </>
      )}
    </div>
  );
}

export default ContentArea;
