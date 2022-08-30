import React, { useContext, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { UserContext } from "./../../../../app/state/contexts/userContext";
function Notifications() {
  const [state, dispatch] = useContext(UserContext);
  const [codes, setCodes] = useState([]);
  useEffect(() => {
    setCodes(state.userData.redeemRequests);
  }, []);
  if (!state.loggedIn) {
    return <></>;
  }
  return (
    <div className={styles.container}>
      <h2>Redeem Codes</h2>
      <div className={styles.codes}>
        {/* {codes?.length === 0 ? (
          <h3>No Redeem Codes</h3>
        ) :  */}
        (
        <React.Fragment>
          <div className={styles.codeHeader}>
            <p>Redeem Codes</p>
            <p>Created At</p>
          </div>
          {codes?.map((code, index) => {
            return (
              <div key={index} className={styles.code}>
                <p>{code.code}</p>
                <p>{code.createdAt}</p>
              </div>
            );
          })}
        </React.Fragment>
        {/* )} */}
      </div>
    </div>
  );
}

export default Notifications;
