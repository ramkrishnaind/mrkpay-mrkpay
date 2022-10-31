import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { UserContext } from "../../../../app/state/contexts/userContext";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app, db } from "./../../../../app/firebase/config";
import Router from "next/router";
import axios from "axios";
const date = new Date();
function Home({ data }) {
  const inputRef = useRef();
  // data.coinsGenerated = 15;
  const [state, dispatch] = useContext(UserContext);
  const [validated, setValidated] = useState(false);
  const [validationFailed, setValidationFailed] = useState(false);
  const [top, setTop] = useState(true);
  const router = useRouter();
  const [path, setPath] = React.useState("");
  const result = date.toUTCString().split(" ");
  const currentDate =
    result[0] + " " + result[1] + " " + result[2] + " " + result[3];
  async function addGeneratedCoin(cache) {
    let targetObj;
    console.log("s");
    // debugger;
    const docRef = doc(db, "users", cache);
    const obj = await getDoc(docRef);
    targetObj = obj.data();
    if (targetObj) {
      // targetObj.coinsGenerated += 1;
      // await setDoc(docRef, targetObj);
      dispatch({ type: "update_user_data", payload: targetObj });
      console.log(targetObj);
    }
  }
  useEffect(() => {
    const goto = localStorage.getItem("goto");
    if (goto) {
      if (goto === "top") {
        setTop(true);
      } else {
        setTop(false);
      }
    }
  }, []);
  function getEquivalentSlug(title) {
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
  useEffect(() => {
    (async function () {
      let uid = null;
      const hash = localStorage.getItem("uad-cache");
      if (hash) {
        uid = hash;
      } else if (state.userData != null) {
        uid = state.userData.uid;
      }
      if (uid == null) {
        return;
      }
      const docRef = doc(db, "users", uid);
      const snapShot = await getDoc(docRef);
      const posts = await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/posts");
      const postsData = await posts.json();
      dispatch({ type: "setposts", payload: postsData.data });
      if (snapShot.exists()) {
        // setNewUser(true);
        dispatch({ type: "update_user_data", payload: snapShot.data() });
        return;
      } else {
        // setNewUser(true);
      }
    })();
  }, []);
  useEffect(() => {
    localStorage.setItem("mozilla-support-status", "na");
    // getRandomPost();
    const tokenGenerated = getCookie("token");
    // debugger;
    if (tokenGenerated == "0x0000000000000000000000000000000000000000") {
      //increment coin here...
      deleteCookie("token");
    }
    addGeneratedCoin(localStorage.getItem("uad-cache"));
  }, []);
  const clickHandler = (e) => {
    e.preventDefault();
    // const res = getRandomPost();
    // debugger;
    if (path) router.replace(path);
  };
  const buttonHandler = (e) => {
    e.preventDefault();
    // const res = getRandomPost();
    // debugger;

    const url = process.env.NEXT_PUBLIC_HOST_URL + "/foreversPosts";
    (async () => {
      axios.get(url).then((res) => {
        const allPosts = res.data.data;
        const slugs = allPosts.map((obj) => getEquivalentSlug(obj.data.title));
        const randomId = slugs[Math.floor(Math.random() * slugs.length)];
        // const status = localStorage.getItem("mozilla-support-status");
        // console.log(status);
        // if (status == "3") {
        // localStorage.setItem("mozilla-support-status", "4");
        // window.open(
        //   process.env.NEXT_PUBLIC_APP_URL + "/news/" + randomId + "#top"
        //   // ,
        //   // "_blank"
        // );
        debugger;
        Router.push(
          `${process.env.NEXT_PUBLIC_APP_URL}/news/${randomId}${
            top ? "#top" : "#footer"
          }`
        );
        // }
      });
    })();
  };
  const validateHandler = (e) => {
    debugger;
    const value = inputRef.current.value.toLowerCase().trim();
    if (value === "" || value.length < 15) return;
    if (value.includes("gclid=") || value.includes("utm_source=")) {
      let i;
      for (i = 1; i <= 5; i++) {
        let valUrl = localStorage.getItem(`validateUrl-${i}`);
        if (!valUrl) {
          break;
        } else {
          if (valUrl.includes(value) || value.includes(valUrl)) {
            setValidated(false);
            inputRef.current.value = "";
            setValidationFailed(true);
            setTimeout(() => {
              setValidationFailed(false);
            }, 2000);
            return;
          }
        }
      }
      i = i % 5;
      localStorage.setItem(`validateUrl-${i}`, value);
      localStorage.setItem("goto", top ? "bottom" : "top");
      inputRef.current.value = "";
      setValidated(true);
    } else {
      inputRef.current.value = "";
      setValidated(false);
      setValidationFailed(true);
      setTimeout(() => {
        setValidationFailed(false);
      }, 2000);
    }
  };
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
  // debugger;
  useEffect(() => {
    // debugger;
    if (state.posts.length === 0) {
      const url = process.env.NEXT_PUBLIC_HOST_URL + "/posts";
      (async () => {
        // setFetching(true);
        axios.get(url).then((res) => {
          dispatch({ type: "setposts", payload: res.data.data });
          // setFetching(false);
        });
      })();
    } else {
      getRandomPost(state.posts);
    }
  }, [state.posts]);
  const getRandomPost = (posts) => {
    // debugger;
    // if (state.posts.length == 0) {
    //   // dispatch({ type: "loadPosts" });

    // }
    // debugger;
    const allPosts = [...posts];
    const slugs = allPosts.map((obj) => createSlug(obj.data.title));
    const randomId = slugs[Math.floor(Math.random() * slugs.length)];
    const status = localStorage.getItem("mozilla-support-status");
    if (status == "na") {
      localStorage.setItem("mozilla-support-status", "1");
      setPath("/news/" + randomId);
      // return "/news/" + randomId;
    }
  };
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
        {/* <Link href={path}> */}
        {data.coinsGenerated !== 0 &&
          data.coinsGenerated % 15 === 0 &&
          !validated && (
            <>
              <button className={styles.btn} onClick={buttonHandler}>
                Go to random post
              </button>
              <div style={{ margin: "20px 10px", width: 380 }}>
                <label style={{ display: "inline-block", width: "100%" }}>
                  Ad Url {"  "}
                  <input
                    ref={inputRef}
                    style={{
                      border: "1px solid gray",
                      padding: "5px",
                      width: "80%",
                    }}
                  />
                </label>
              </div>
              {validationFailed && (
                <div
                  style={{
                    margin: "20px 10px",
                    border: "1px solid red",
                    width: 280,
                  }}
                >
                  <label
                    style={{
                      display: "inline-block",
                      width: "100%",
                      color: "red",
                      padding: "5px",
                    }}
                  >
                    Validation failed
                  </label>
                </div>
              )}
              <button className={styles.btn} onClick={validateHandler}>
                Validate Url
              </button>
            </>
          )}
        {/*<button className={styles.btn} onClick={topHandler}>
          Top
        </button>
        <button className={styles.btn} onClick={bottomHandler}>
          Bottom
        </button>*/}
        {data.coinsGenerated === 0 ||
          ((data.coinsGenerated % 15 !== 0 || validated) && (
            <button className={styles.btn} onClick={clickHandler}>
              Start Earning Coin
            </button>
          ))}
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Home;
