import "../styles/globals.css";
import Header from "../components/Header/Header";
import Head from "next/head";
import { AdminContextContainer } from "../app/state/contexts/adminContext";
import UserContextContainer from "../app/state/contexts/userContext";
import "./../styles/cardstyles.css";
import Footer from "../components/Footer/Footer";
function MyApp({ Component, pageProps }) {
  return (
    <UserContextContainer>
      <AdminContextContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </AdminContextContainer>
    </UserContextContainer>
  );
}

export default MyApp;
