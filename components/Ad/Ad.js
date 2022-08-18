import React from "react";
import styles from "./style.module.scss";
function Ad({ imgUrl }) {
  return (
    <div className={styles.container}>
      {imgUrl ? <img src={imgUrl} alt="ad-image" /> : ""}
    </div>
  );
}

export default Ad;
