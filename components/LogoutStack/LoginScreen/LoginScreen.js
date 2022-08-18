import React, { useContext, useEffect } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { app, db } from "../../../app/firebase/config";
import { UserContext } from "./../../../app/state/contexts/userContext";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

function LoginScreen() {
  // States to Handle LoginScreen State
  const [data, setData] = React.useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = React.useState("");
  const [state, dispatch] = useContext(UserContext);

  // Token to decrypt uid
  function decryptUser(hash) {
    let ch = "";
    for (let i = 12; i < hash.length - 12; i++) {
      ch += hash[i];
    }
    return ch;
  }
  // Fetching user token
  useEffect(() => {
    (async function () {
      const hash = localStorage.getItem("uad-cache");
      if (hash) {
        const uid = hash;
        const docRef = doc(db, "users", uid);
        console.log("Fetching data using id...");
        const val = await getDoc(docRef);
        console.log("Fetching data using id...Complete");
        dispatch({ type: "update_user_data", payload: val.data() });
      }
    })();
  }, []);

  // Function to Login using Email - Password
  async function handleLogin() {
    const { email, password } = data;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        console.log("User authorized");
        const userData = { uid: credential.user.uid };
        localStorage.setItem("uad-cache", credential.user.uid);
        dispatch({ type: "login", payload: userData });
      })
      .catch((err) => {
        if (err.code == "auth/user-not-found") {
          setErrMsg("User does not exist!");
        } else if (err.code == "auth/wrong-password") {
          setErrMsg("Incorrect Password!");
        }
        console.log(err);
      });
  }

  // Function to handle Google Authentication
  function handleGoogleAuth() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const userData = {
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
        };
        //Todo: Will accessToken for SafeLink Login Process...
        localStorage.setItem("uad-cache", userData.uid);
        dispatch({ type: "login", payload: userData });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Error", error);
        // ...
      });
  }

  // Function to handle Facebook Authentication
  function handleFacebookAuth() {
    console.log("Facebook authentication");

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
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  }
  return (
    <div className={styles.container}>
      <h2>MRKPAY Account Login</h2>

      {/* <div className={styles.fbBtn} onClick={handleFacebookAuth}>
        <img src="/assets/fb-logo.png" />
        <p>Continue with Facebook</p>
      </div>
      <div className={styles.googleBtn} onClick={handleGoogleAuth}>
        <img src="/assets/google-logo.png" />
        <p>Continue with Google</p>
      </div>
      <p>Or</p> */}

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
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
            setErrMsg("");
          }}
        />
      </div>
      <div className={styles.error}>
        <p>{errMsg ? errMsg : ""}</p>
      </div>
      <button className={styles.loginBtn} onClick={handleLogin}>
        Log in
      </button>
      <p className={styles.signUpLink}>
        Do not have an account? Click{" "}
        <span>
          <Link href="/signup">Sign up</Link>
        </span>
      </p>
    </div>
  );
}

export default LoginScreen;
