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
  } else if (type == "firstvisit") {
    return { ...state, firstVisit: false };
  } else if (type == "setposts") {
    return {
      ...state,
      // currentCategory: "",
      // currentPosts: [],
      posts: action.payload,
    };
  } else if (type == "set-category-posts") {
    return {
      ...state,
      // currentCategory: "",
      // currentPosts: [],
      categoryPosts: action.payload,
    };
  } else if (type == "set-categories") {
    return { ...state, categories: action.payload };
  } else if (type == "setmutage") {
    return { ...state, mutage: action.payload };
  } else if (type == "setid") {
    return { ...state, uid: action.payload };
  } else if (type == "clear-more") {
    return { ...state, more: false };
  } else if (type == "clear-currentCategory") {
    return { ...state, currentCategory: "", currentPosts: [] };
  } else if (type == "set-more-currentCategory") {
    const newState = { ...state };
    console.log("newState", newState);
    switch (action.payload.trim().toLowerCase()) {
      case "latest news":
        // debugger;
        newState.currentCategory = action.payload;
        newState.currentPosts = [...newState.posts];

        break;
      default:
        newState.currentCategory = action.payload;
        newState.currentPosts = [...newState.categoryPosts[action.payload]];
        break;
    }
    newState.more = true;
    return { ...newState };
  } else if (type == "set-currentCategory") {
    // debugger;
    const newState = { ...state };
    console.log("newState", newState);
    switch (action.payload.trim().toLowerCase()) {
      case "latest news":
        // debugger;
        newState.currentCategory = action.payload;
        newState.currentPosts = [...newState.posts];
        break;
      default:
        newState.currentCategory = action.payload;
        newState.currentPosts = [...newState.categoryPosts[action.payload]];
        break;
    }
    return { ...newState };
  } else if (type == "filter") {
    // debugger;
    const newState = { ...state };
    console.log("newState", newState);
    newState.currentCategory = "Filtered Posts";
    newState.currentPosts = [
      ...newState.posts.filter((item) =>
        item.data.title
          .toLowerCase()
          .trim()
          .includes(action.payload.trim().toLowerCase())
      ),
    ];

    return { ...newState };
  } else if (type == "outside-search") {
    const newState = { ...state };
    if (!action.payload) {
      newState.currentCategory = "";
      newState.currentPosts = [];
    }
    return { ...newState, outsideSearch: action.payload };
  } else if (type == "redirect-dashboard") {
    return { ...state, redirectToDashboard: true };
  } else if (type == "redirect-dashboard-false") {
    return { ...state, redirectToDashboard: false };
  } else if (type == "set-current-post") {
    debugger;
    const newState = { ...state };
    newState.currentPosts = [
      ...newState.posts.filter(
        (item) =>
          item.data.title.toLowerCase().trim() ===
          action.payload.title.trim().toLowerCase()
      ),
    ];
    return { ...newState };
  }
}

async function registerNewUser(docName, docDetails) {
  const docRef = doc(db, "users", docName);
  await setDoc(docRef, docDetails);
}
