import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
function NewsHighlight({ data, id }) {
  function createSlug(title) {
    let slug = "";
    let oldTitle = title;
    for (let i = 0; i < oldTitle.length; i++) {
      if (oldTitle[i] == " ") {
        slug += "-";
      } else {
        slug += oldTitle[i].toLowerCase();
      }
    }
    return slug;
  }
  const slug = createSlug(data.title);
  return (
    <Link href={`/news/${slug}`}>
      <div className={styles.highlightContainer}>
        <img src={data.imgUrl} alt="post-img" />
        <p>{data.details}</p>
      </div>
    </Link>
  );
}

export default NewsHighlight;
