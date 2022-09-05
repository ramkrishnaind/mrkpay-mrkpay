import React, { useContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app, db } from "./../../app/firebase/config";
import Link from "next/link";
import styles from "./style.module.scss";
import Countdown from "react-countdown";
import ReCAPTCHA from "react-google-recaptcha";
import Script from "next/script";
import Ad from "../Ad/Ad";
import { UserContext } from "./../../app/state/contexts/userContext";
function GenerateCoinBtn() {
  const recaptchaRef = React.useRef(null);
  const [mining, setMining] = useState(false);
  const [showCaptcha, setCaptcha] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    if (state.firstVisit) {
      dispatch({ type: "firstvisit" });
    }
  }, []);

  function startMining(e) {
    e.preventDefault();
    setCaptcha(true);
  }
  function handleRecaptchaChange() {
    setMining(true);
  }
  function getRandomPost() {
    const allPosts = state.posts;
    const idz = allPosts.map((obj) => obj.id);
    const randomId = idz[Math.floor(Math.random() * idz.length)];
    return randomId;
  }

  const LoginError = () => (
    <h3 className={styles.miningResult}>
      You have failed to generate a coin. Please{" "}
      <Link href="/user">log in</Link> first.
    </h3>
  );
  async function addGeneratedCoin(uid) {
    let targetObj;
    const docRef = doc(db, "users", uid);
    const obj = await getDoc(docRef);
    targetObj = obj.data();
    if (targetObj) {
      targetObj.coinsGenerated += 1;
      await setDoc(docRef, targetObj);
      setCaptcha(false);
      console.log(targetObj);
    }
  }

  // Renderer callback with condition
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      // console.log("111");
      // Get User from Browser
      // (function () {
      //   const hash = localStorage.getItem("uad-cache");
      //   if (hash) {
      //     addGeneratedCoin(hash);
      //     const targetUrl = "/news/" + getRandomPost();
      //     return (
      //       <h3 className={styles.miningResult}>
      //         You have successfully generated a coin. Click
      //         <Link href={targetUrl}>here</Link> to confirm
      //       </h3>
      //     );
      //   } else {
      //     return <LoginError />;
      //   }
      // })();
      const targetUrl = "/news/" + getRandomPost();
      localStorage.setItem("status", "generating");
      // addGeneratedCoin();
      return (
        <h3 className={styles.miningResult}>
          You have successfully generated a coin. Click
          <Link href={targetUrl}>here</Link> to confirm
        </h3>
      );
    } else {
      // Render a countdown
      return (
        <div style={{ textAlign: "center" }}>
          <h3>
            <span style={{ color: "green" }}>Mining Started</span>
            <br />
            Coin will be generated in {seconds} seconds.
          </h3>
        </div>
      );
    }
  };
  return (
    <>
      {mining ? (
        <Countdown date={Date.now() + 10000} renderer={renderer} />
      ) : (
        <>
          {showCaptcha ? (
            <>
              <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    document.write(
                      '<script src="//banner.incrementxserv.com/scripts/pageads.js?vzId=PNXX877000VGGCF27&vzR=' +
                        Math.floor(Math.random() * 100(new Date().getTime() / 1000)) +
                        '"></script>'
                    );
                  `,
                }}
              />
              <ReCAPTCHA
                sitekey="6LfG4zghAAAAAJdKLRIZPpOyPeL_T9L2VOZBfFDe"
                onChange={handleRecaptchaChange}
                ref={recaptchaRef}
              />
              <Ad dataAdSlot="1861051743" />
            </>
          ) : (
            <>
              <button className={styles.btn} onClick={startMining}>
                💲 Generate Coin 💲
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}

export default GenerateCoinBtn;
