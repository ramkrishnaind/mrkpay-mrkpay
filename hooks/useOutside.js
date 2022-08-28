import React, { useRef, useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, dotsRef, searchRef) {
  const [clickedOutside, setClickedOutside] = useState(false);
  // debugger;
  // useEffect(() => {
  //   setClickedOutside(!show);
  // }, [show]);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        ref.current &&
        // !ref.current.contains(event.target) &&
        !(dotsRef.current && dotsRef.current.contains(event.target))
        // &&
        // !(searchRef.current && searchRef.current.contains(event.target))
      ) {
        // alert("You clicked outside of me!");
        // debugger;
        setClickedOutside(true);
      } else if (dotsRef.current && dotsRef.current.contains(event.target)) {
        setClickedOutside(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);
  return clickedOutside;
}
export default useOutsideAlerter;
