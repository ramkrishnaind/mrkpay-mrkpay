import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { db } from "./../../../../../app/firebase/config";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState(0);
  const [totalCoinsRedeem, setTotalCoinsRedeem] = useState(0);
  const [totalCoinsGenerated, setTotalCoinsGenerated] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState("all");
  const compareFunc = (a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  };
  useEffect(() => {
    (async function () {
      console.log("Fetching transactions...");
      debugger;

      // const users = [];
      const snapshot = await getDocs(collection(db, "users"));
      debugger;
      setUsers(snapshot.docs.length);
      const collectionRef = collection(db, "transactions");
      const snapShots = await getDocs(collectionRef);

      let totalRedeemed = 0;
      const objToSet = [];
      debugger;
      snapShots.docs.forEach(async (obj) => {
        const date = obj.id.slice(0, 10);
        totalRedeemed += obj.data().coinsAmount;
        // totalTemp += obj.data().coinsAmount;
        const found = objToSet.find((i) => i.date == date);

        if (!found) {
          objToSet.push({
            date,
            data: obj.data(),
            coinsGenerated: 0,
            coinsRedeemed: obj.data().coinsAmount,
            // dateObj: new Date(date).getTime(),
          });
        } else {
          found.coinsGenerated += 0;
          found.coinsRedeemed += !isNaN(obj.data().coinsAmount)
            ? obj.data().coinsAmount
            : 0;
          // found.amount += obj.data().amount;
        }
        // console.log("objToSet", objToSet);
        // console.log("obj.data()", obj.data());
        return { date, data: obj.data() };
      });
      const coinTransactionCollectionRef = collection(db, "coinTransaction");
      const snapShotsCoinTransaction = await getDocs(
        coinTransactionCollectionRef
      );
      const coinTr = [];
      // const foundTr = coinTr.find((i) => i.date == obj.id.slice(0, 10));
      snapShotsCoinTransaction.docs.forEach(async (obj) => {
        const found = coinTr.find(
          (i) => i.date == obj.data().createdAt?.slice(0, 10)
        );
        if (found) {
          found.coinGenerated += !isNaN(obj.data().coinGenerated)
            ? obj.data().coinGenerated
            : 0;
        } else {
          debugger;

          const date = obj.data().createdAt.slice(0, 10);
          const coinGenerated = obj.data().coinGenerated;
          coinTr.push({ date, coinGenerated, coinRedeemed: 0 });
        }
      });
      const dates = objToSet.map((t) => t.date);
      const actualTranscations = coinTr
        .filter((it) => dates.includes(it.date))
        .map((i) => ({
          date: i.date,
          coinsGenerated: i.coinGenerated,
          coinsRedeemed: i.coinRedeemed,
          data: { amount: 0 },
        }));
      objToSet.forEach((it) => {
        debugger;
        const foundTran = actualTranscations.find((i) => i.date === it.date);
        if (foundTran) it.coinsGenerated += foundTran.coinsGenerated;
      });
      const additionalTranscations = coinTr
        .filter((it) => !dates.includes(it.date))
        .map((i) => ({
          date: i.date,
          coinsGenerated: i.coinGenerated,
          coinsRedeemed: i.coinRedeemed,
          data: { amount: 0 },
        }));
      debugger;
      debugger;
      const objTotal = [...objToSet, ...additionalTranscations];
      objTotal.sort(compareFunc);
      setTransactions(objTotal);
      // objToSet.sort(compareFunc);
      // setTransactions(objToSet);
      setTotalCoinsRedeem(totalRedeemed);
      // setUsers(users);
      debugger;

      const collectionRef2 = collection(db, "users");
      const snapShots2 = await getDocs(collectionRef2);
      // totalTemp = 0;
      for (let i = 0; i < snapShots2.docs.length; i++) {
        // if (users.includes(snapShots2.docs[i].id))
        // totalTemp += !isNaN(snapShots2.docs[i].data().coinsGenerated)
        //   ? snapShots2.docs[i].data().coinsGenerated
        //   : 0;
      }
      const coinsGeneratedTotal = objTotal.reduce((tot, cur) => {
        return tot + cur.coinsGenerated;
      }, 0);
      setTotalCoinsGenerated(coinsGeneratedTotal);
    })();
  }, []);
  function handleFilter(type) {
    // debugger;
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
  debugger;

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
        {/* <span
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
        </span> */}
      </div>
      <h3 className="py-3 pt-5">Total Coins Generated:{totalCoinsGenerated}</h3>
      <h3 className="py-3">Total Coins Redeemed:{totalCoinsRedeem}</h3>
      <h3 className="py-3">Total Users:{users}</h3>
      {/* {filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Coins Generated</td>
              <td>Coins Redeeemed</td>
              <td>Rupees</td>
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
      ) : ( */}
      <table>
        <thead>
          <tr>
            <td>Date</td>
            <td>Coins Generated</td>
            <td>Coins Redeeemed</td>
            {/* <td>Rupees</td> */}
          </tr>
        </thead>
        <tbody>
          {transactions.map((tr, i) => {
            return (
              <tr key={i}>
                <td>{tr.date}</td>
                <td>{tr.coinsGenerated}</td>
                <td>{tr.coinsRedeemed}</td>
                {/* <td>{tr.data?.amount}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* )} */}
    </div>
  );
}

export default Transactions;
