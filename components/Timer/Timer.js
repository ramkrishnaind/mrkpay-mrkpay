import React, { useState, useRef, useEffect, useContext } from "react";
import GenerateCoinBtn from "../GenerateCoinBtn/GenerateCoinBtn";
import { UserContext } from "./../../app/state/contexts/userContext";
import Countdown from "react-countdown";
import styles from "./style.module.scss";
const Timer = () => {
  const [state, dispatch] = useContext(UserContext);
  const [countdownCompleted, setCountDownCompleted] = useState(false);
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      setCountDownCompleted(true);
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <h3>App resources will be loaded in {seconds} seconds.</h3>
        </div>
      );
    }
  };
  if (state.firstVisit) {
    return (
      <div className={styles.container}>
        {countdownCompleted ? (
          <>
            <div style={{ height: "20px" }} />
            <GenerateCoinBtn />
          </>
        ) : (
          <Countdown date={Date.now() + 10000} renderer={renderer} />
        )}
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div style={{ height: "20px" }} />
        <GenerateCoinBtn />
      </div>
    );
  }
};

export default Timer;
