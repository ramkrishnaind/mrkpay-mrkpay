import React, { useContext, useEffect, useState } from "react";
import { UserContext as AppContext } from "../../../../app/state/contexts/userContext";
import NewsImage from "../../NewsImage";
const RandomNPosts = ({ numberOfPosts = 5 }) => {
  const [posts, setPosts] = useState([]);
  function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }

  const [state] = useContext(AppContext);
  useEffect(() => {
    setPosts(getMultipleRandom(state?.posts || [], numberOfPosts));
  }, [state?.posts]);

  return (
    <div className="bg-white">
      <h2 className="text-center bg-gray-500 py-2 px-2 text-lg text-white ">
        Hot news
      </h2>
      {(posts || [])?.map((obj, index) => {
        let slug = "";
        let oldTitle = obj.data.title;
        for (let i = 0; i < oldTitle.length; i++) {
          if (oldTitle[i] == " ") {
            slug += "-";
          } else {
            slug += oldTitle[i]?.toLowerCase();
          }
          if (slug.substr(slug.length - 1) === "?")
            slug = slug.substr(0, slug.length - 1);
        }
        return (
          // <div>This is some text</div>
          <NewsImage
            key={index}
            linkUrl={`/news/${slug}`}
            imageUrl={obj.data.imgUrl}
            title={obj.data.title}
          />
        );
      })}
    </div>
  );
};

export default RandomNPosts;
