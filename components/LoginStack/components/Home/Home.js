import React, { useContext, useEffect } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { UserContext } from "../../../../app/state/contexts/userContext";
import { getCookie, deleteCookie } from "cookies-next";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app, db } from "./../../../../app/firebase/config";
const date = new Date();
function Home({ data }) {
  const [state, dispatch] = useContext(UserContext);
  const [path, setPath] = React.useState("/");
  const result = date.toUTCString().split(" ");
  const currentDate =
    result[0] + " " + result[1] + " " + result[2] + " " + result[3];
  async function addGeneratedCoin(cache) {
    let targetObj;
    const docRef = doc(db, "users", cache);
    const obj = await getDoc(docRef);
    targetObj = obj.data();
    if (targetObj) {
      targetObj.coinsGenerated += 1;
      await setDoc(docRef, targetObj);
      dispatch({ type: "update_user_data", payload: targetObj });
      console.log(targetObj);
    }
  }
  useEffect(() => {
    localStorage.setItem("mozilla-support-status", "na");
    getRandomPost();
    const tokenGenerated = getCookie("token");
    if (tokenGenerated == "0x0000000000000000000000000000000000000000") {
      //increment coin here...
      deleteCookie("token");
      // addGeneratedCoin(localStorage.getItem("uad-cache"));
    }
  }, []);
  function createSlug(title) {
    let slug = "";
    let oldTitle = title;
    for (let i = 0; i < oldTitle.length; i++) {
      if (oldTitle[i] == " ") {
        slug += "-";
      } else {
        slug += oldTitle[i]?.toLowerCase();
      }
    }
    return slug;
  }
  function getRandomPost() {
    if (state.posts.length == 0) {
      dispatch({ type: "loadPosts" });
    }
    const allPosts = state.posts;
    const slugs = allPosts.map((obj) => createSlug(obj.data.title));
    const randomId = slugs[Math.floor(Math.random() * slugs.length)];
    const status = localStorage.getItem("mozilla-support-status");
    if (status == "na") {
      localStorage.setItem("mozilla-support-status", "1");
      setPath("/news/" + randomId);
    }
  }
  return (
    <div className={styles.container}>
      <h2 className="text-lg text-center  my-5">Welcome, {data.name} 😎</h2>
      <p className={`${styles.date} text-lg text-center  my-5`}>
        {currentDate}.
      </p>
      <div className={`flex  ${styles.percentage1}`}>
        <h2 className="min-w-[6rem] text-base mb-3">
          Coins: <span>{data.coinsGenerated || 0}</span>
        </h2>
      </div>
      <div className={styles.btnContainer}>
        {/* <h3>You can start earning now 💵</h3> */}
        <Link href={path}>
          <button className={styles.btn}>Start Earning Coin</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
