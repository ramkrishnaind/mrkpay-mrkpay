import React from "react";
import Link from "next/link";
import styles from "./style.module.scss";
function TopNewsHightlight({ imgUrl, content }) {
  return (
    <Link href="/news/daiodueh">
      <div className={styles.container}>
        <img src={imgUrl} alt="top-news" />
        <h2>{content}</h2>
      </div>
    </Link>
  );
}

export default TopNewsHightlight;
