import React, { useState } from "react";
import styles from "./style.module.scss";
import axios from "axios";
function Post({ data, id, updatePosts }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  function deletePost() {
    debugger;
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
  function createMarkup(length = 30) {
    console.log("data.details", data.details);
    const p = document.createElement("p");
    p.innerHTML = data?.details || "";
    // p.classList.add("hover:underline");
    const arr = p.innerText.split(" ");
    const count = Math.floor(arr.length < length ? arr.length : length);
    const arrToTake = arr.map((item, index) => {
      if (index <= count) return item;
    });
    let result = arrToTake.join(" ") + (arr.length > length ? "..." : "");
    if (result.length > 80) {
      result = result.substring(0, 80) + " ...";
    }
    // return result;
    return {
      __html: data.details,
    };
  }
  if (!data) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <div className="w-[15rem] mr-5">
        <img
          src={data.imgUrl}
          alt="img"
          // style={{ width: "100%" }}
          className={` object-cover rounded-lg w-full mr-5`}
        />
      </div>

      <div className={styles.right}>
        <div className={styles.head}>
          <p className={styles.title}>{data.title}</p>
          {data.author && <span className={styles.author}>{data.author}</span>}
          <div className="relative p-3">
            <button
              onClick={deletePost}
              className={`${
                confirmDelete ? styles["button-confirm"] : styles.button
              }`}
            >
              {confirmDelete ? "Confirm" : "X"}
            </button>
            {confirmDelete && (
              <button
                onClick={() => setConfirmDelete(!confirmDelete)}
                className={`absolute right-0 top-0 ${styles["button-cancel"]} bg-pink-200`}
              >
                X
              </button>
            )}
          </div>
        </div>
        <p dangerouslySetInnerHTML={createMarkup()} />
        {/* <p className={styles.body}>{data.details}</p> */}
      </div>
    </div>
  );
}

export default Post;
