import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import GetCoinBtn from "../../components/GetCoinBtn/GetCoinBtn";
import { useRouter } from "next/router";
import Head from "next/head";
import { UserContext } from "./../../app/state/contexts/userContext";
import axios from "axios";
function News(props) {
  const [state, dispatch] = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [isFetching, setFetching] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const localstatus = localStorage.getItem("mozilla-support-status");
    setStatus(localstatus);
    if (state.posts.length > 0) {
      return;
    }
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/posts";
    (async () => {
      setFetching(true);
      axios.get(url).then((res) => {
        dispatch({ type: "setposts", payload: res.data.data });
        setFetching(false);
      });
    })();
  }, []);

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

  function getPost(postId) {
    let post = null;
    if (state.posts.length > 0) {
      for (let i = 0; i < state.posts.length; i++) {
        if (createSlug(state.posts[i].data.title) == postId) {
          post = state.posts[i];
        }
      }
      return post;
    }
    return null;
  }
  if (isFetching) {
    return <p>Loading...</p>;
  }
  const targetPost = getPost(id);

  if (targetPost) {
    return (
      <>
        <Head>
          <title>{targetPost.data.title}</title>
        </Head>
        <div className={styles.container}>
          {/* <div className={styles.ad}>Before [Ad Content]</div> */}
          {status == "1" ? <GetCoinBtn /> : ""}
          <img src={targetPost.data.imgUrl} />
          <h3>{targetPost.data.title}</h3>
          <p style={{ textAlign: "center" }}>{targetPost.data.details}</p>
          {/* <div className={styles.ad}>After [Ad Content]</div> */}
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default News;
