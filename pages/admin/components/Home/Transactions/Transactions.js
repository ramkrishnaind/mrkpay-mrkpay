import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { db } from "./../../../../../app/firebase/config";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [totalCoinsRedeem, setTotalCoinsRedeem] = useState(0);
  const [totalCoinsGenerated, setTotalCoinsGenerated] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState("all");
  useEffect(() => {
    (async function () {
      console.log("Fetching transactions...");
      const collectionRef = collection(db, "transactions");
      const snapShots = await getDocs(collectionRef);
      let totalTemp = 0;
      const readableTr = snapShots.docs.map((obj) => {
        const date = obj.id.slice(0, 10);
        totalTemp += obj.data().coinsAmount;
        return { date, data: obj.data() };
      });
      setTransactions(readableTr);
      setTotalCoinsRedeem(totalTemp);

      const collectionRef2 = collection(db, "users");
      const snapShots2 = await getDocs(collectionRef2);
      totalTemp = 0;
      for (let i = 0; i < snapShots2.docs.length; i++) {
        totalTemp += snapShots2.docs[i].data().coinsGenerated;
      }
      setTotalCoinsGenerated(totalTemp);
    })();
  }, []);
  function handleFilter(type) {
    if (type == "all") {
      setSelected(type);
      setFilteredData([]);
      return;
    } else if (type == "today") {
      const todayDate = new Date().toISOString().slice(0, 10);
      let tempFiltered = [];
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].date == todayDate) {
          tempFiltered.push(transactions[i]);
        }
      }
      if (tempFiltered.length > 0) {
        setSelected(type);
        setFilteredData(tempFiltered);
      }
    } else if (type == "yesterday") {
      const date = new Date().toISOString().slice(0, 10);
      const arr = date.split("-");
      const yesterday = arr[0] + "-" + arr[1] + "-" + (arr[2] - 1);
      let yesFiltered = [];
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].date == yesterday) {
          yesFiltered.push(transactions[i]);
        }
      }
      if (yesFiltered.length > 0) {
        setSelected(type);
        setFilteredData(yesFiltered);
      }
    }
  }
  if (transactions.length == 0) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBtns}>
        <span
          onClick={() => handleFilter("all")}
          style={
            selected == "all"
              ? { backgroundColor: "black", color: "white" }
              : {}
          }
        >
          All
        </span>
        <span
          onClick={() => handleFilter("today")}
          style={
            selected == "today"
              ? { backgroundColor: "black", color: "white" }
              : {}
          }
        >
          Today
        </span>
        <span
          onClick={() => handleFilter("yesterday")}
          style={
            selected == "yesterday"
              ? { backgroundColor: "black", color: "white" }
              : {}
          }
        >
          Yesterday
        </span>
      </div>
      <h3>Total Coins Generated:{totalCoinsGenerated}</h3>
      <h3>Total Coins Redeemed:{totalCoinsRedeem}</h3>
      {filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Coins</td>
              <td>Ruppees</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((tr, i) => {
              return (
                <tr key={i}>
                  <td>{tr.date}</td>
                  <td>{tr.data.coinsAmount}</td>
                  <td>{tr.data.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Coins</td>
              <td>Ruppees</td>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tr, i) => {
              return (
                <tr key={i}>
                  <td>{tr.date}</td>
                  <td>{tr.data.coinsAmount}</td>
                  <td>{tr.data.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Transactions;
