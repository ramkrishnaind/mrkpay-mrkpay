import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import TopNewsHightlight from "./TopNewsHighlight/TopNewsHightlight";
import NewsHighlight from "./NewsHighlight/NewsHighlight";
import axios from "axios";
import { UserContext } from "./../../app/state/contexts/userContext";

function News() {
  const [state, dispatch] = useContext(UserContext);
  console.log(state);
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/posts";
    (async () => {
      axios.get(url).then((res) => {
        dispatch({ type: "setposts", payload: res.data.data });
      });
    })();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          {/* <div className={styles.trending}>
            <p>Trending</p>
            <Link href="/">
              <a>Sri Lanka Crisis</a>
            </Link>
            <Link href="/">
              <a>Web stories</a>
            </Link>
            <Link href="/">
              <a>Fake news buster</a>
            </Link>
            <Link href="/">
              <a>Coronavirus</a>
            </Link>
          </div> */}
          <h3>Latest News</h3>
          <div className={styles.newsContainer}>
            {state.posts == undefined ? (
              <h1>Fetcing Posts</h1>
            ) : (
              state.posts.map((obj) => {
                return (
                  <NewsHighlight key={obj.id} data={obj.data} id={obj.id} />
                );
              })
            )}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.ad}>Ad will be shown</div>
          <div className={styles.weather} style={{ display: "none" }}>
            <div className={styles.weatherDetails}>
              <div>
                <h3>
                  26<sup>°C</sup>
                </h3>
                <p>cloudy heavy rain</p>
              </div>
              <div className={styles.weatherCity}>
                <select>
                  <option>Mumbai</option>
                  <option>Mumbai</option>
                  <option>Mumbai</option>
                </select>
              </div>
            </div>
            <h4>Know more</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default News;
