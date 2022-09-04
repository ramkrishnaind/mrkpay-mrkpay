import React from "react";
import TopNCategories from "./TopNCategories";
import RandomNPosts from "./RandomNPosts";
const index = () => {
  return (
    <div className=" bg-[#F2F2F0] flex flex-col gap-3">
      <TopNCategories />
      <RandomNPosts />
    </div>
  );
};

export default index;
