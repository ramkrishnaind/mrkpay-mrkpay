import React from "react";
import RelatedNPosts from "./RelatedNPosts";
import TopNCategories from "../TopNCategories";
const RightAdvertisement = () => {
  return (
    <div className=" bg-[#F2F2F0] flex flex-col gap-3">
      <RelatedNPosts />
      {/* <div className="mb-3"></div> */}
      <TopNCategories />
    </div>
  );
};

export default RightAdvertisement;
