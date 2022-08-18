import React, { useState } from "react";
import styles from "./style.module.scss";
import axios from "axios";
function Post({ data, id, updatePosts }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  function deletePost() {
    if (confirmDelete) {
      const url = process.env.NEXT_PUBLIC_HOST_URL + `/posts`;
      axios.delete(url, { data: { id } }).then((res) => {
        console.log(res);
        setConfirmDelete(false);
        updatePosts(Math.random());
      });
    } else {
      setConfirmDelete(true);
    }
  }
  if (!data) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <img src={data.imgUrl} alt="img" className={data.left} />

      <div className={styles.right}>
        <div className={styles.head}>
          <p className={styles.title}>{data.title}</p>
          <span className={styles.author}>{data.author}</span>
          <button onClick={deletePost}>
            {confirmDelete ? "Confirm" : "X"}
          </button>
        </div>
        <p className={styles.body}>{data.details}</p>
      </div>
    </div>
  );
}

export default Post;
