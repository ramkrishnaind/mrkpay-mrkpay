import React, { useContext, useState } from "react";
import styles from "./dashboard.module.scss";
import { GetAdminContext } from "../../app/state/contexts/adminContext";
import Home from "./components/Home/Home";
import Posts from "./components/Posts/Posts";
import Settings from "./components/Settings/Settings";
import Reports from "./components/Reports/Reports";
import PendingPayments from "./components/PendingPayments/PendingPayments";

function Dashboard() {
  const [state, dispatch] = useContext(GetAdminContext);
  const [selectedTab, setSelectedTab] = useState("Home");
  if (state.loggedIn) {
    return (
      <div className={styles.container}>
        <nav>
          <a
            onClick={() => setSelectedTab("Home")}
            style={{
              borderBottom: `2px ${
                selectedTab === "Home" ? "black" : "transparent"
              } solid`,
            }}
          >
            Home
          </a>
          <a
            onClick={() => setSelectedTab("Posts")}
            style={{
              borderBottom: `2px ${
                selectedTab === "Posts" ? "black" : "transparent"
              } solid`,
            }}
          >
            Posts
          </a>
          <a
            onClick={() => setSelectedTab("Reports")}
            style={{
              borderBottom: `2px ${
                selectedTab === "Reports" ? "black" : "transparent"
              } solid`,
            }}
          >
            Reports
          </a>
          <a
            onClick={() => setSelectedTab("Pending")}
            style={{
              borderBottom: `2px ${
                selectedTab === "Pending" ? "black" : "transparent"
              } solid`,
            }}
          >
            Payments
          </a>
          <a
            onClick={() => setSelectedTab("Settings")}
            style={{
              borderBottom: `2px ${
                selectedTab === "Settings" ? "black" : "transparent"
              } solid`,
            }}
          >
            Settings
          </a>
        </nav>
        <div className={styles.tabContent}>
          {selectedTab === "Home" && <Home />}
          {selectedTab === "Posts" && <Posts />}
          {selectedTab === "Reports" && <Reports />}
          {selectedTab === "Pending" && <PendingPayments />}
          {selectedTab === "Settings" && <Settings />}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Dashboard;
