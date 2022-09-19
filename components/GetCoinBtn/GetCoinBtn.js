import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { setCookie } from "cookies-next";
function GetCoinBtn() {
  const url = getTargetURL();
  function getTargetURL() {
    const date = new Date();
    const after = date.getMinutes();
    const en = localStorage.getItem("uad-cache") + after;
    const targetUrl = process.env.NEXT_PUBLIC_APP_URL || "https://forevers.in";
    return targetUrl + "/" + en;
  }
  function handleClick() {
    localStorage.setItem("mozilla-support-status", "2");
    window.location.href = url;
  }
  return (
    <a href={url}>
      <button className={styles.btn} onClick={handleClick}>
         Get Coin 
      </button>
    </a>
  );
}

export default GetCoinBtn;
