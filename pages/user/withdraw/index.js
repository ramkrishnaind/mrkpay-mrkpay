import React, { useContext, useState, useEffect } from "react";
import styles from "./style.module.scss";
import axios from "axios";
import Head from "next/head";
import { UserContext } from "./../../../app/state/contexts/userContext";
function Withdraw() {
  const [state, dispatch] = useContext(UserContext);
  const [availableAmount, setAvailableAmount] = useState(0);
  const [withdrawing, setWithdrawing] = useState(false);
  const [withDrawSucceed, setWithdrawSucceed] = useState(false);
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    const targetAmount = parseInt(state.userData.coinsGenerated / 10) * 10;
    let temp = 0;
    for (let i = 0; i <= targetAmount; i += 50) {
      temp = i;
    }
    setAvailableAmount(temp);
  }, []);

  function startTransaction() {
    const coins = state.userData.coinsGenerated;
    if (coins < 50) {
      return;
    }
    setWithdrawing(true);
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/withdraw";
    const data = {
      uid: localStorage.getItem("uad-cache"),
      amount: availableAmount,
    };
    axios
      .post(url, data)
      .then((res) => {
        setWithdrawing(false);
        const result = res.data;
        if (result.status === "success") {
          setCodes(res.data.redeemCodes);
          setWithdrawSucceed(true);
        } else if (result.status === "error") {
          alert(result.message);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }
  if (withdrawing) {
    return (
      <div style={{ marginTop: "20px" }} className="mx-auto text-lg mb-3">
        <h2>Withdrawing Coins... Please wait...</h2>
      </div>
    );
  }
  if (!state.loggedIn) {
    return <>No Access Available</>;
  }
  return (
    <>
      <Head>
        <title>MRKPay.com</title>
      </Head>

      <div className={styles.container}>
        {withDrawSucceed ? (
          <div>
            <h2>You have successfully withdrawn {availableAmount} coins</h2>
            <h1>Redeem Codes</h1>
            {codes.map((code, index) => {
              return <p key={index}>{code.code}</p>;
            })}
          </div>
        ) : (
          <>
            <h3 className="mx-auto text-lg mb-3">
              You can only withdraw {availableAmount} coins.
            </h3>
            <button onClick={startTransaction} className="w-64 mx-auto">
              Redeem {availableAmount} coins
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Withdraw;
