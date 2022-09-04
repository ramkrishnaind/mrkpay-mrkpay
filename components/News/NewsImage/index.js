import React from "react";
import Link from "next/link";
import styles from "./NewsImage.module.css";
import getWindowDimensions from "../../../hooks/useWindowDimensions";
const NewsImage = ({ linkUrl, imageUrl, title }) => {
  const { height, width } = getWindowDimensions();
  function createMarkup(length = 30) {
    console.log("data.details", title);
    const p = document.createElement("p");
    p.innerHTML = title || "";
    const arr = p.innerText.split(" ");
    const count = Math.floor(arr.length < length ? arr.length : length);
    const arrToTake = arr.map((item, index) => {
      if (index <= count) return item;
    });
    let result = arrToTake.join(" ") + (arr.length > length ? "..." : "");
    if (result.length > 80) {
      result = result.substring(0, 80) + " ...";
    }
    return result;
    // return {
    //   __html: data.details,
    // };
  }
  return (
    <div className="py-3" style={{ cursor: "pointer" }}>
      <Link href={linkUrl}>
        <div className="flex items-center">
          <div className="flex items-center md:w-44 md:h-44 m-auto pt-1 relative">
            <img
              src={imageUrl}
              alt="post-img"
              className={`object-cover rounded-lg md:w-44 md:h-44 ${styles.img}`}
            />
            <p
              className={`opacity-0 md:w-44 rounded-lg box-border left-0 py-2 px-2 z-10 bg-blue-900 text-blue-100 ${styles.p} absolute hover:underline`}
              style={{ wordBreak: "break-word" }}
            >
              {createMarkup(width < 768 ? 17 : 10)}
            </p>
          </div>

          {/* <p dangerouslySetInnerHTML={createMarkup()} />; */}
        </div>
      </Link>
    </div>
  );
};

export default NewsImage;
