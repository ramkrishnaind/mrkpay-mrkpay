import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import styles from "./style.module.scss";
import { UserContext } from "./../../app/state/contexts/userContext";
import { GetAdminContext } from "./../../app/state/contexts/adminContext";
function Header() {
  const [state1, dispatch1] = useContext(UserContext);
  const [state2, dispatch2] = useContext(GetAdminContext);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (!state1 || !state2) {
      return;
    }
    if (state1.loggedIn || state2.loggedIn) {
      setLoggedIn(true);
    }
  }, [state1, state2]);
  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        if (state1.loggedIn) {
          dispatch1({ type: "logout" });
        } else if (state2.loggedIn) {
          dispatch2({ type: "logout" });
        }
        setLoggedIn(false);
      })
      .catch((error) => {});
  }
  return (
    <header className={styles.container}>
      <Link href="/">
        <img className={styles.logo} src="/assets/mbl-logo.png" />
      </Link>
      <nav>
        {/* <div className={styles.languages}>
          <a>বাংলা</a>
          <a>ગુજરાતી</a>
          <a>हिन्दी</a>
          <a>ಕನ್ನಡ</a>
          <a>മലയാളം</a>
          <a>தமிழ்</a>
          <a>తెలుగు</a>
          <a>ଓଡ଼ିଆ</a>
          <a>ENGLISH</a>
          <img src="/assets/fb-logo.jpg" alt="f" className={styles.fb} />
          <img
            src="/assets/twitter-logo.png"
            alt="t"
            className={styles.twitter}
          />
          <img src="/assets/yt-logo.png" alt="f" className={styles.yt} />
        </div> */}
        <div className={styles.navLinks}>
          <img src="/assets/menu-icon.png" alt="f" className={styles.menu} />
          <div className={styles.mblLogo}>
            <Link href="/">
              <img src="/assets/mbl-logo.png" />
            </Link>
          </div>
          <div className={styles.links}>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/about">
              <a>About</a>
            </Link>
            <Link href="/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
            <Link href="/contact-us">
              <a>Contact Us</a>
            </Link>
            <Link href="/user">
              <button
                style={{
                  background: "red",
                  padding: "5px 10px",
                  height: "100%",
                  borderRadius: "5px",
                }}
              >
                Earn Coin
              </button>
            </Link>
          </div>
          <Link href="/user">
            <div className={styles.earnCoinBtn}>
              <button
                style={{
                  background: "red",
                  padding: "5px 10px",
                  height: "100%",
                  borderRadius: "5px",
                }}
              >
                Earn Coin
              </button>
            </div>
          </Link>
          {loggedIn ? (
            <div className={styles.burger}>
              {/* <Link href="/user">
                <a>Profile</a>
              </Link> */}
              <Link href="/">
                <a onClick={logout}>Log out</a>
              </Link>
            </div>
          ) : (
            <div className={styles.burger}>
              <Link href="/signup">
                <a>Sign up</a>
              </Link>
              <Link href="/user">
                <a>Log in</a>
              </Link>
              {/* <img src="/assets/menu.png" /> */}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
