import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { sha256 } from "js-sha256";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { app, db } from "./../../../../app/firebase/config";
import Transactions from "./Transactions/Transactions";
const temp = 0;
function Home() {
  const [safeLinks, setSafeLinks] = useState([
    {
      decrypted: "https://www.google.com",
      encrypted: "hash",
      views: 0,
      clicks: 0,
    },
  ]);
  const [data, setData] = React.useState({
    link: "",
    domain: "http://localhost:3000",
  });
  const outputRef = useRef(null);
  function handleCopyToClipboard(e) {
    const textToCopy = e.target.parentElement.firstChild.innerText;
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
  function handleSafeLinkCopy() {
    outputRef.current.select();
    document.execCommand("copy");
    setTimeout(() => {
      outputRef.current.blur();
    }, 100);
  }

  function handleClick() {
    const hash = sha256.create();
    hash.update(data["link"]);
    const encrypted = hash.hex();
    const result = data["domain"] + "/" + encrypted;
    outputRef.current.value = result;
    const newObj = {
      decrypted: data["link"],
      encrypted: result,
      views: 0,
      clicks: 0,
    };
    setSafeLinks([newObj, ...safeLinks]);
  }
  //Page Rendering
  return (
    <Transactions />
    // <div className={styles.container}>
    //   <form>
    //     <div className={styles.input}>
    //       <label>Domain</label>
    //       <br />
    //       <input
    //         type="text"
    //         value={data["domain"]}
    //         onChange={(e) => setData({ ...data, domain: e.target.value })}
    //       />
    //     </div>

    //     <div className={styles.input}>
    //       <label>Enter Link</label>
    //       <br />
    //       <input
    //         type="text"
    //         value={data["link"]}
    //         onChange={(e) => setData({ ...data, link: e.target.value })}
    //       />
    //     </div>
    //   </form>
    //   <div
    //     style={{ width: "40%", display: "flex", justifyContent: "flex-end" }}
    //   >
    //     <button className={styles.generateLink} onClick={handleClick}>
    //       Generate Link
    //     </button>
    //   </div>
    //   <div className={styles.copySafeLink}>
    //     <input type="text" ref={outputRef} />
    //     <img src="/assets/copy-btn.png" onClick={handleSafeLinkCopy} />
    //   </div>
    //   <table className={styles.safeLinkTable}>
    //     <thead>
    //       <tr>
    //         <th>Decrypted Link</th>
    //         <th>Encrypted Link</th>
    //         <th>Views</th>
    //         <th>Clicks</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {safeLinks.map((link, index) => (
    //         <tr
    //           key={index}
    //           style={{
    //             backgroundColor: `${
    //               index % 2 == 0 ? "rgba(0,0,0,0.1)" : "white"
    //             }`,
    //           }}
    //         >
    //           <td className={styles.text}>
    //             <div>
    //               <p>{link.decrypted}</p>
    //               <img
    //                 src="/assets/copy-btn.png"
    //                 onClick={handleCopyToClipboard}
    //               />
    //             </div>
    //           </td>
    //           <td className={styles.text}>
    //             <div>
    //               <p>{link.encrypted}</p>
    //               <img
    //                 src="/assets/copy-btn.png"
    //                 onClick={handleCopyToClipboard}
    //               />
    //             </div>
    //           </td>
    //           <td>{link.views}</td>
    //           <td>{link.clicks}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}

export default Home;
