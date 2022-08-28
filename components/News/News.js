import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import TopNewsHightlight from "./TopNewsHighlight/TopNewsHightlight";
import NewsHighlight from "./NewsHighlight/NewsHighlight";
import axios from "axios";
import { UserContext as AppContext } from "../../app/state/contexts/userContext";
function News({ category, categoryPosts, more }) {
  console.log("categoryPosts", categoryPosts);
  // console.log(state);
  // useEffect(() => {
  //   const url = process.env.NEXT_PUBLIC_HOST_URL + "/foreversPosts";
  //   (async () => {
  //     axios.get(url).then((res) => {
  //       console.log("res.data.data", res.data.data);
  //       dispatch({ type: "setposts", payload: res.data.data });
  //     });
  //   })();
  // }, []);
  const [state, dispatch] = useContext(AppContext);
  return (
    <div className="container-sm md:flex w-100 col-1 flex-1">
      <div className="w-100 md:flex-1">
        <div className="bg-gray-500 py-2 px-2 text-lg text-white capitalize flex justify-between">
          <h3>{category?.toLowerCase()}</h3>
          {more && (
            <h3
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch({
                  type: "set-more-currentCategory",
                  payload: category,
                });
                // setTimeout(() => {
                //   dispatch({
                //     type: "clear-more",
                //   });
                // }, 1000);
              }}
            >
              More {" >>"}
            </h3>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 pl-1">
          {categoryPosts?.length == 0 ? (
            <h1>Fetcing Posts</h1>
          ) : (
            categoryPosts?.map((obj, index) => {
              return (
                // <div>This is some text</div>
                <NewsHighlight
                  key={obj.id || index}
                  data={obj.data ? obj.data : obj}
                  id={obj.id || index}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default News;
