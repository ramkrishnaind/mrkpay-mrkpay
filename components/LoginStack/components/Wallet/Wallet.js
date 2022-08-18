import React, { useContext } from "react";
import Card from "./CreditCard/Card";
import Link from "next/link";
import styles from "./style.module.scss";
import { UserContext } from "./../../../../app/state/contexts/userContext";
function Wallet() {
  const [state, dispatch] = useContext(UserContext);
  const data = state.userData;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Wallet</h2>
      </div>
      <div className={styles.walletDetails}>
        <div className={styles.walletDetails_left}>
          <div className={styles.balance}>
            <span>Current Balance</span>
            <p>
              <strong>₹</strong>
              {parseFloat(data.coinsGenerated / 5).toFixed(2)}
            </p>
          </div>
          <div className={styles.mrkcoins}>
            <span>Coins Generated</span>
            <p>{data.coinsGenerated}</p>
          </div>
          <div className={styles.redeem}>
            <span>Coins Redeemed</span>
            <p>{data.coinsRedeemed}</p>
          </div>
        </div>
        <div className={styles.walletDetails_right}>
          {/* <Card name={data.name} /> */}
          <Link href="/user/withdraw">
            <button
              className={
                data.coinsGenerated >= 50 ? styles.active : styles.inactive
              }
              disabled={data.coinsGenerated < 50}
            >
              Withdraw Coins
            </button>
          </Link>

          <h3 style={{ display: data.coinsGenerated < 50 ? "block" : "none" }}>
            You can only withdraw coins more than 50
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
