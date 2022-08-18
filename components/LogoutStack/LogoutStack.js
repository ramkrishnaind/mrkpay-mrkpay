import React from "react";
import LoginScreen from "./LoginScreen/LoginScreen";
function LogoutStack({ setUserData }) {
  return (
    <>
      <LoginScreen setUserData={setUserData} />
    </>
  );
}

export default LogoutStack;
