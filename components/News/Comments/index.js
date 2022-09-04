import React, { useRef } from "react";
import styles from "./Comments.module.scss";
const Comments = () => {
  const ref = useRef();
  return (
    <div className=" py-3 border-spacing-2 border-2 px-2">
      <h3 className="text-lg bg-gray-500 py-2 px-2 text-white">Comments</h3>
      <textarea ref={ref} rows={5} className="w-full"></textarea>
      <button
        className={styles.btn}
        onClick={(e) => {
          e.preventDefault();
          ref.current.value = "";
        }}
      >
        💲 Submit 💲
      </button>
    </div>
  );
};

export default Comments;
