import React from "react";
import styles from "./style.module.scss";
function Sidebar({ setCurrentScreen }) {
  return (
    <div className={`${styles.container} min-w-[5rem] md:min-w-[15rem]`}>
      <div className={styles.link} onClick={() => setCurrentScreen("home")}>
        <img src="/assets/home-white.png" />
        <p>Earn Coin</p>
      </div>
      <div className={styles.link} onClick={() => setCurrentScreen("noti")}>
        <img src="/assets/icons8-notification-48.png" />
        <p>Transactions</p>
      </div>
      <div className={styles.link} onClick={() => setCurrentScreen("wallet")}>
        <img src="/assets/wallet.png" />
        <p>Wallet</p>
      </div>
      <div className={styles.link} onClick={() => setCurrentScreen("settings")}>
        <img src="/assets/settings-white.png" />
        <p>Settings</p>
      </div>
    </div>
  );
}

export default Sidebar;
