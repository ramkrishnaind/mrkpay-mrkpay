// import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
export default function Document() {
  const addEL = (e) => {
    e.preventDefault();
    alert("test");
  };

  return (
    <Html>
      <Head>
        {/* <Script
          async
          strategy="beforeInteractive"
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        ></Script>
        <Script id="show-banner" strategy="beforeInteractive">
          {`window.googletag = window.googletag || {cmd: []};
            googletag.cmd.push(function() {
            googletag.defineSlot('/22709598084/TOP_GAM_ADSENSE_responsive', [[336, 280], 'fluid'], 'div-gpt-ad-1666968727085-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
          `}
        </Script> */}

        {/* <Script
          id="Adsense-id"
          data-ad-client="ca-pub-7006648733841921"
          //   async="true"
          strategy="beforeInteractive"
          crossorigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        /> */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9084866693962656"
          crossorigin="anonymous"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* <Script id="show-ad-manager" strategy="beforeInteractive">
          {`
          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1666968727085-0'); });
          `}
        </Script> */}
      </body>
    </Html>
  );
}
