import { app, db } from "./../../firebase/config";
import { doc, setDoc, collection } from "firebase/firestore";
const date = new Date();
export default function UserReducer(state, action) {
  const type = action.type;
  // Condition 1
  if (type == "login") {
    return {
      ...state,
      posts: state.posts,
      loggedIn: true,
      userData: action.payload,
    };
  }
  // Condition 2
  else if (type == "logout") {
    localStorage.removeItem("uad-cache");
    return { ...state, posts: state.posts, loggedIn: false, userData: null };
  }
  // Condition 3
  else if (type == "update_user_data") {
    return {
      ...state,
      posts: state.posts,
      loggedIn: true,
      userData: { ...state.userData, ...action.payload },
    };
  }
  // Condition 4
  else if (type == "update_remote_user") {
    const remoteObj = {
      name: action.payload.name,
      email: action.payload.email,
      phone: action.payload.phone,
      coinsGenerated: 0,
      coinsRedeemed: 0,
      amountEarned: 0,
      redeemRequests: [],
      createdAt: date.toLocaleDateString(),
    };
    registerNewUser(localStorage.getItem("uad-cache"), remoteObj);
    let updatedState = {
      loggedIn: true,
      userData: { ...remoteObj },
      posts: state.posts,
    };
    return updatedState;
  } else if (type == "setposts") {
    return { ...state, posts: action.payload };
  } else if (type == "firstvisit") {
    return { ...state, firstVisit: false };
  }
}

async function registerNewUser(docName, docDetails) {
  const docRef = doc(db, "users", docName);
  await setDoc(docRef, docDetails);
}
