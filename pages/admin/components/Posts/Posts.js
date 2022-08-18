import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import axios from "axios";
import { GetAdminContext } from "../../../../app/state/contexts/adminContext";
import Link from "next/link";
import Post from "./Post/Post";
function Posts() {
  const [posts, setPosts] = useState([]);
  const [updatePosts, setUpdatePosts] = useState(false);
  useEffect(() => {
    (async function () {
      const url = process.env.NEXT_PUBLIC_HOST_URL + "/posts";
      axios
        .get(url)
        .then((res) => {
          setPosts(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    })();
  }, [updatePosts]);
  return (
    <div className={styles.container}>
      <Link href="/admin/addPost">
        <button className={styles.addPostBtn}>Add New Post</button>
      </Link>
      <div className={styles.posts}>
        {posts.length == 0 ? (
          <h1>Fetching Posts</h1>
        ) : (
          posts.map((post, index) => {
            return (
              <Post
                key={index}
                data={post.data}
                id={post.id}
                updatePosts={setUpdatePosts}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Posts;
