import React, { createContext, useReducer } from "react";
import userReducer from "../reducers/userReducer";

const initialState = {
  loggedIn: false,
  userData: null,
  posts: [],
  firstVisit: false,
};
export const UserContext = createContext(initialState);

export default function UserContextContainer({ children }) {
  const reducerVal = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={reducerVal}>{children}</UserContext.Provider>
  );
}
