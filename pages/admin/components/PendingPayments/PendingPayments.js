import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import axios from "axios";
function PendingPayments() {
  const [codes, setCodes] = useState([]);
  const [usedCodesCount, setUsedCodesCount] = useState(0);
  const [unUsedCodesCount, setUnUsedCodesCount] = useState(0);

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("No file choosen");
  const [successMsg, setSuccessMsg] = useState(false);
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/upload";
    axios.get(url).then((res) => {
      const result = res.data;
      if (result.status == "success") {
        setCodes(result.data);
      }
      let used = 0,
        unused = 0;
      result.data.forEach((code) => {
        if (code.status == "used") {
          used += 1;
        } else if (code.status == "unused") {
          unused += 1;
        }
      });
      setUsedCodesCount(used);
      setUnUsedCodesCount(unused);
    });
  }, []);
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/upload";
  const handleChange = (e) => {
    setSuccessMsg(false);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.status == "success") {
        setSuccessMsg(true);
        setFile(null);
        setFileName("No file choosen");
      }
    } catch (e) {
      if (e) {
        console.log("Error", e);
        return;
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.chooseFile}>
        <input type="file" onChange={handleChange} />
      </div>
      {successMsg ? (
        <p style={{ width: "100%", textAlign: "center", color: "green" }}>
          File uploaded!
        </p>
      ) : (
        ""
      )}
      <button className={styles.submit} onClick={handleSubmit}>
        Upload
      </button>

      <br />
      <br />
      <div className={styles.code}>
        <p>
          Used Codes <b>{usedCodesCount}</b>
        </p>
        <p>
          Unused Codes <b>{unUsedCodesCount}</b>
        </p>
      </div>
      <div className={styles.dataContainer} style={{ display: "none" }}>
        <div className={styles.codeHeader}>
          <p>Codes</p>
          <span>Status</span>
          <span>Created At</span>
        </div>
        {codes.length == 0 ? (
          <h2>Loading Redeem Codes...</h2>
        ) : (
          codes.map((obj, i) => {
            return (
              <div key={i} className={styles.code}>
                <p>{obj.code}</p>
                <span style={{ color: obj.status == "used" ? "red" : "green" }}>
                  {obj.status}
                </span>
                <p>{obj.createdAt}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default PendingPayments;
