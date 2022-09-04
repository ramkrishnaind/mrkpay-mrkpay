import React, { useState } from "react";
import ReactTags from "react-tag-autocomplete";
// import "./AutoComplete.css";
import classes from "./Autocomplete.module.css";

const AutoComplete = (props) => {
  const reactTags = React.createRef();
  const [tagsState, setTagsState] = useState({
    tags: props.tags || [],
    suggestions: props.suggestions || [],
  });
  const onDelete = (i) => {
    const tags = tagsState.tags.slice(0);
    tags.splice(i, 1);
    setTagsState((prevState) => {
      return {
        ...prevState,
        tags: [...tags],
      };
    });
    props.onTagsChanged(tags);
  };
  const onAddition = (tag) => {
    // debugger;
    const tagFound = tagsState.tags.find(
      (a) => a.name?.toLowerCase().trim() === tag.name?.toLowerCase().trim()
    );
    if (!tagFound) {
      const tags = [
        ...tagsState.tags,
        {
          id: tagsState.tags.length + 1,
          name: tag.name,
        },
      ];
      setTagsState((prevState) => {
        props.onTagsChanged([...tags]);
        return {
          ...prevState,
          tags: [...tags],
        };
      });
    }
    const suggestionFound = tagsState.suggestions.find(
      (a) => a.name?.toLowerCase().trim() === tag.name?.toLowerCase().trim()
    );
    if (!suggestionFound) {
      const sugestions = [
        ...tagsState.suggestions,
        {
          id: tagsState.suggestions.length + 1,
          name: tag.name,
        },
      ];
      setTagsState((prevState) => {
        return {
          ...prevState,
          suggestions: [...sugestions],
        };
      });
    } else {
    }
  };
  return (
    <div className={classes.container}>
      {/* <div className={classes.labelContainer}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <label>{props.title}</label>
        </div>
      </div> */}
      <ReactTags
        placeholderText={props.placeholderText || "Enter a value"}
        ref={reactTags}
        minQueryLength={1}
        tags={tagsState.tags}
        suggestions={tagsState.suggestions}
        onDelete={onDelete}
        allowNew
        onAddition={onAddition}
        className={classes.reactTags}
      />
    </div>
  );
};

export default AutoComplete;
