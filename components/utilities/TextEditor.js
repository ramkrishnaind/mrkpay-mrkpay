import React, { useEffect } from "react";

import { useQuill } from "react-quilljs";
import classes from "./TextEditor.module.css";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css"; // Add css for snow theme

export default function IndexPage({ setContent }) {
  const { quill, quillRef } = useQuill();

  // useEffect(() => {
  //   // console.log(quill, quillRef);
  //   console.log("!");
  //   // if (quill) quill.setText("123");
  //   if (quill) quill.clipboard.dangerouslyPasteHTML("");
  // }, [content]);
  if (quill)
    quill.on("text-change", (delta, oldContents, source) => {
      if (source !== "user") return;
      if (quill)
        console.log("quill", quill.root.innerHTML.split("  ").join(" &nbsp;"));
      setContent(quill.root.innerHTML.split("  ").join(" &nbsp;"));
    });
  return (
    <div className={`${classes.container}`}>
      <div ref={quillRef} />
    </div>
  );
}
