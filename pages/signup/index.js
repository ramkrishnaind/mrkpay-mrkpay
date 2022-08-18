import React, { useState, useContext } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { app, db } from "../../app/firebase/config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { UserContext } from "./../../app/state/contexts/userContext";

function Signup({ setState }) {
  const [state, dispatch] = useContext(UserContext);
  const PASSWORD_ERROR = "Passwords does not match";
  const EMAIL_ERROR = "Email already exists";
  const [successmsg, setsuccessmsg] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  });

  async function handleSignup() {
    console.log("Signup Clicked");
    setSigningUp(true);
    setsuccessmsg(false);
    setErrMsg("");
    const { email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setErrMsg(PASSWORD_ERROR);
      setSigningUp(false);
      return;
    }
    setErrMsg("");
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        setSigningUp(false);
        setsuccessmsg(true);
        localStorage.setItem("uad-cache", credential.user.uid);
        setsuccessmsg(true);
        dispatch({
          type: "update_remote_user",
          payload: {
            name: data.name,
            phone: data.phone,
            email,
          },
        });
      })
      .catch((err) => {
        if (err.code == "auth/email-already-in-use") {
          setErrMsg(EMAIL_ERROR);
          setSigningUp(false);
        }
      });
  }

  function handleGoogleAuth() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const userData = {
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
        };
        //Todo: Will accessToken for SafeLink Login Process...
        localStorage.setItem("uad-cache", userData.uid);
        dispatch({ type: "login", payload: userData });
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  function handleFacebookAuth() {
    const provider = new FacebookAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        };
        localStorage.setItem("uad-cache", userData.uid);
        dispatch({ type: "login", payload: userData });

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h2>Welcome to MRKPAY</h2>
        {/* <div className={styles.fbBtn} onClick={handleFacebookAuth}>
          <img src="/assets/fb-logo.png" />
          <p>Continue with Facebook</p>
        </div>
        <div className={styles.googleBtn} onClick={handleGoogleAuth}>
          <img src="/assets/google-logo.png" />
          <p>Continue with Google</p>
        </div>

        <p>OR</p> */}
        <div className={styles.input}>
          <label>Full Name</label>
          <input
            type="text"
            value={data["name"]}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>

        <div className={styles.input}>
          <label>Phone Number</label>
          <input
            type="text"
            value={data["phone"]}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
        </div>

        <div className={styles.input}>
          <label>Email</label>
          <input
            type="email"
            value={data["email"]}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
              setErrMsg("");
            }}
          />
        </div>
        <div className={styles.input}>
          <label>Password</label>
          <input
            type="password"
            value={data["password"]}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className={styles.input}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={data["confirmPassword"]}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
          />
        </div>
        <div className={styles.error}>
          <p>{errMsg ? errMsg : ""}</p>
          {successmsg ? (
            <p style={{ color: "green" }}>
              Account successfully created. You can{" "}
              <Link href="/user">
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Login
                </span>
              </Link>{" "}
              now
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          className={styles.loginBtn}
          onClick={handleSignup}
          disabled={signingUp}
        >
          Create Account
        </button>

        <p className={styles.signUpLink}>
          Already have an account? Click{" "}
          <span>
            <Link href="/">Log In</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
