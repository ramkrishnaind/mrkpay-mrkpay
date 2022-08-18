import React, { useContext, useState } from "react";
import styles from "./style.module.scss";
import axios from "axios";
import Link from "next/link";
import { GetAdminContext } from "../../../app/state/contexts/adminContext";
const initialState = {
  title: "",
  details: "",
  author: "",
  imgUrl: "",
};
function AddPost() {
  const [state, dispatch] = useContext(GetAdminContext);
  const [successMsg, setSuccessMsg] = useState(false);
  const [data, setData] = React.useState(initialState);
  async function handleAddPost() {
    if (data.title.length > 0 && data.details.length > 0) {
      const url = process.env.NEXT_PUBLIC_HOST_URL + "/posts";
      axios.post(url, data).then((res) => {
        if (res.data.status == "success") {
          setSuccessMsg(true);
          setData(initialState);
        }
      });
    }

    //setData(initialState);
  }
  if (state.loggedIn) {
    return (
      <div className={styles.container}>
        <form>
          <h3>Add Post</h3>
          <div className={styles.input}>
            <label>Title</label>
            <input
              type="text"
              required
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className={styles.input}>
            <label>Details</label>
            <textarea
              type="text"
              required
              value={data.details}
              onChange={(e) => setData({ ...data, details: e.target.value })}
            />
          </div>
          <div className={styles.input}>
            <label>Author</label>
            <input
              type="text"
              placeholder="(Optional)"
              value={data.author}
              onChange={(e) => setData({ ...data, author: e.target.value })}
            />
          </div>
          <div className={styles.input}>
            <label>ImageURL</label>
            <input
              type="text"
              value={data.imgUrl}
              onChange={(e) => setData({ ...data, imgUrl: e.target.value })}
            />
          </div>
        </form>
        <p
          className={styles.successMsg}
          style={{ display: successMsg ? "block" : "none" }}
        >
          <span> Post Added Successfully ✔️</span>
          <br />
          Click{" "}
          <Link href="/admin/dashboard">
            <u style={{ cursor: "pointer" }}>here</u>
          </Link>{" "}
          to go back to admin console.
        </p>
        <button onClick={handleAddPost} className={styles.addPostBtn}>
          Submit
        </button>
      </div>
    );
  }
}

export default AddPost;
