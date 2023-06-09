import React, { useContext } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useRouter } from "next/router";
import "./../styles/globals.css";
import UserContextContainer from "../app/state/contexts/userContext";
import { AdminContextContainer } from "../app/state/contexts/adminContext";
import Head from "next/head";
import Script from "next/script";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // console.log("router", router);
  // React.useEffect(() => {}, []);
  // React.useEffect(() => {
  //   debugger;
  //   !window.adsbygoogle
  //     ? (window.adsbygoogle = window.adsbygoogle || []).push({})
  //     : console.log("Adsbygoogle already exists");
  // }, []);
  const user = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#F2F2F0",
        }}
        className="flex-col md:flex-row gap-3"
      >
        <Script
          id="Adsense-id"
          data-ad-client="2397723075092719"
          async="true"
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            // width: "80vw",

            minHeight: "100vh",
            // flex: 1,
          }}
          className="w-full"
        >
          <Header marginX={"80px"} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              // margin: "auto",
              // minWidth: "100%",
              // minHeight: "100vh",
              // margin: "0 80px",
              // position: "relative",

              flex: 1,
            }}
            // className="md:top-[5rem] top-[4rem]"
            className="w-full"
          >
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
  const other = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#F2F2F0",
        }}
        className="flex-col md:flex-row "
      >
        {/* <Script
          id="Adsense-id"
          async
          onError={(e) => {
            console.error("Script failed to load", e);
          }}
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2397723075092719"
          crossorigin="anonymous"
        /> */}
        <div className="w-full hidden md:block md:flex-1"></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            // width: "80vw",

            minHeight: "100vh",
            // flex: 1,
          }}
          className="w-full md:w-1000px"
        >
          <Header width={80} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              // margin: "auto",
              minWidth: "100%",
              // position: "relative",

              flex: 1,
            }}
            // className="md:top-[5rem] top-[4rem]"
          >
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
        <div className="w-full hidden md:block md:flex-1"></div>
      </div>
    </>
  );
  const news = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F2F2F0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",

            // width: "80vw",
            minHeight: "100vh",
            // flex: 1,
          }}
          className="w-full  md:w-1280px"
        >
          <Header width={80} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // position: "relative",
              // justifyContent: "center",
              // alignItems: "center",
              // margin: "auto",
              minWidth: "100%",
              flex: 1,
            }}
            className="w-full md:w-4/6"
          >
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
  return (
    <AdminContextContainer>
      {/* <Script
        id="Adsense-id"
        async
        // data-ad-client="ca-pub-2397723075092719"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3107788607445438"
        crossorigin="anonymous"
      /> */}
      {/* <Script
        id="Adsense-id"
        async
        // data-ad-client="ca-pub-2397723075092719"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-16W10XZ5WT"
        crossorigin="anonymous"
      /> */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-16W10XZ5WT');
              `,
        }}
      />
      <UserContextContainer>
        {router.asPath.includes("/news/")
          ? news
          : router.asPath.includes("/user")
          ? user
          : other}
      </UserContextContainer>
    </AdminContextContainer>
  );
}

export default MyApp;
