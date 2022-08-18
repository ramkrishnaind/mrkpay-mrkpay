import React, { createContext, useReducer } from "react";
import adminReducer from "../reducers/adminReducer";
const initialState = { loggedIn: false, userData: null };
export const GetAdminContext = createContext(initialState);

export const AdminContextContainer = ({ children }) => {
  const state = useReducer(adminReducer, initialState);
  return (
    <GetAdminContext.Provider value={state}>
      {children}
    </GetAdminContext.Provider>
  );
};
