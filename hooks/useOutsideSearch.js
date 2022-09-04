import React, { useRef, useEffect, useState, useContext } from "react";
import { UserContext as AppContext } from "../app/state/contexts/userContext";
/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideSearch(ref, searchRef, searchBoxRef, show, search) {
  const [state, dispatch] = useContext(AppContext);
  const [clickedOutside, setClickedOutside] = useState(!show);
  // debugger;
  useEffect(() => {
    setClickedOutside(!show);
  }, [show]);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    // debugger;
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !(searchRef.current && searchRef.current.contains(event.target))
      ) {
        // alert("You clicked outside of me!");
        // debugger;
        setClickedOutside(true);
      } else if (
        searchBoxRef.current &&
        searchBoxRef.current.contains(event.target)
      ) {
        dispatch({ type: "filter", payload: search });
        setClickedOutside(false);
      } else if (
        searchRef.current &&
        searchRef.current.contains(event.target)
      ) {
        setClickedOutside(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, searchRef, searchBoxRef]);
  return clickedOutside;
}
export default useOutsideSearch;
