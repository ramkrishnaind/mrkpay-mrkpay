import App from "next/app";
import React, { useContext } from "react";
import Link from "next/link";
import { UserContext as AppContext } from "../../../app/state/contexts/userContext";
const TopNCategories = () => {
  const [state, dispatch] = useContext(AppContext);

  return (
    <div className="bg-white px-2">
      <h2 className="text-center bg-gray-500 py-2 px-2 text-lg text-white ">
        Post categories
      </h2>
      <ul className="items-center justify-center">
        {state?.categories?.length > 0 &&
          state?.categories.map((item, index) => (
            <li
              className="text-black py-1 my-3 hover:text-white hover:bg-black ease-in-out duration-300 hover:p-2 hover:mx-auto hover:cursor-pointer"
              key={index}
            >
              <Link
                href="/"
                onClick={() => dispatch({ type: "clear-currentCategory" })}
              >
                <a
                  onClick={() => {
                    dispatch({
                      type: "set-currentCategory",
                      payload: item,
                    });
                    // menuClickHandler();
                  }}
                  className="capitalize"
                >
                  {item?.toLowerCase()}
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TopNCategories;
