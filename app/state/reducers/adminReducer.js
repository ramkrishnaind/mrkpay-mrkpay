function AdminReducer(state, action) {
  switch (action.type) {
    case "login":
      return { loggedIn: true };
      break;
    case "logout":
      return { loggedIn: false };
      break;
    case "SET_POSTS":
      return { loggedIn: true, posts: action.payload };
  }
}
export default AdminReducer;
