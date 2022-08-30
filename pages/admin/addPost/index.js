import React, { useContext, useState, useEffect } from "react";
import styles from "./style.module.scss";
// import classes from "./addPost.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { GetAdminContext } from "../../../app/state/contexts/adminContext";
import Link from "next/link";
import TextEditor from "../../../components/utilities/TextEditor";
import ReactTags from "react-tag-autocomplete";
import AutoComplete from "../../../components/utilities/Autocomplete";
const initialState = {
  title: "",
  details: "",
  author: "",
  imgUrl: "",
};
function AddPost() {
  const [successMsg, setSuccessMsg] = useState(false);
  const [stateAdmin, dispatchAdmin] = useContext(GetAdminContext);
  const reactTags = React.createRef();
  const [tags, setTags] = useState();
  // console.log("stateAdmin?.loggedIn", stateAdmin?.loggedIn);
  const router = useRouter();
  const categories = [
    // { id: 3, name: "Bananas" },
    // { id: 4, name: "Mangos" },
    // { id: 5, name: "Lemons" },
    // { id: 6, name: "Apricots" },
    // { id: 1, name: "Apples" },
    // { id: 2, name: "Pears" },
  ];
  const [categoriesFetched, setCategoriesFetched] = useState();
  const [categoriesToAdd, setCategoriesToAdd] = useState(
    categories.map((i) => i.name)
  );
  useEffect(() => {
    debugger;
    console.log("stateAdmin?.loggedIn", stateAdmin?.loggedIn);
    if (!stateAdmin?.loggedIn) router.replace("/admin/login");
  }, []);
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/mrkPayPostCategories";
    (async () => {
      axios.get(url).then((res) => {
        console.log("res.data", res.data);
        if (res.data.data.length === 0) {
          setCategoriesFetched([]);
        } else {
          setCategoriesFetched(
            res.data.data.map((item, index) => ({
              id: index + 1,
              name: item.data.name,
            }))
          );
        }
      });
    })();
  }, []);
  const initialTags = [
    // { id: 1, name: "Apples" },
    // { id: 2, name: "Pears" },
  ];

  // const [tagsState, setTagsState] = useState({
  //   tags: [
  //     { id: 1, name: "Apples" },
  //     { id: 2, name: "Pears" },
  //   ],
  //   suggestions: [
  //     { id: 3, name: "Bananas" },
  //     { id: 4, name: "Mangos" },
  //     { id: 5, name: "Lemons" },
  //     { id: 6, name: "Apricots" },
  //     { id: 1, name: "Apples" },
  //     { id: 2, name: "Pears" },
  //   ],
  // });
  // const onDelete = (i) => {
  //   const tags = tagsState.tags.slice(0);
  //   tags.splice(i, 1);
  //   setTagsState((prevState) => {
  //     return {
  //       ...prevState,
  //       tags: [...tags],
  //     };
  //   });
  //   // props.onTagsChanged(tags);
  // };
  const tagsChangeHandler = (tags) => {
    setTags(tags);
    const tagNames = tags.map((i) => i.name);
    const prevCategories = categoriesFetched.map((i) => i.name);
    const categoriesNew = tagNames.filter((i) => !prevCategories.includes(i));

    setData({ ...data, categories: tagNames });
    setCategoriesToAdd((prev) => [...prev, ...categoriesNew]);
  };

  const onAddition = (tag) => {
    const tags = [].concat(tagsState.tags, tag);
    setTagsState((prevState) => {
      return {
        ...prevState,
        tags: [...tags],
      };
    });
    // props.onTagsChanged(tags);
  };
  // console.log("tags", tags);
  // console.log("categoriesFetched", categoriesFetched);
  // console.log("setCategoriesToAdd", categoriesToAdd);

  const [data, setData] = React.useState(initialState);
  async function handleAddPost() {
    if (data.title.length > 0 && data.details.length > 0 && tags.length > 0) {
      const url = process.env.NEXT_PUBLIC_HOST_URL + "/posts";
      const urlCategories =
        process.env.NEXT_PUBLIC_HOST_URL + "/mrkPayPostCategories";
      categoriesToAdd.forEach(async (category, index) => {
        try {
          await axios.post(urlCategories, { name: category });
        } catch {}
      });
      axios.post(url, data).then((res) => {
        if (res.data.status == "success") {
          setSuccessMsg(true);
          setData(initialState);
          // setTimeout(() => {
          //   setCategoriesFetched(null);
          // }, 4000);
          router.push("/");
        }
      });
    }
  }
  console.log("data", data);
  return (
    <div>
      <form>
        <div className="w-5/6 mx-auto flex-col md:flex md:flex-row">
          <label className="inline-block w-100 md:w-1/4"></label>
          <div className="md:w-[28rem] md:flex w-100  justify-center  py-1">
            <h3 className="w-100 text-center">Add Post</h3>
          </div>
        </div>
        <div className="w-5/6 mx-auto  w-100 flex flex-col md:flex-row justify-between my-4">
          <label className="w-100 md:w-1/5">Title</label>
          <input
            type="text"
            required
            className="md:w-4/5 w-100 border-2 w-100 py-1 px-1"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>
        <div className="w-5/6 mx-auto  w-100 flex flex-col md:flex-row justify-between my-4">
          <label className="md:w-[12rem]">Details</label>
          <TextEditor
            className="w-3/5 ml-5"
            content={data.details}
            setContent={(content) => setData({ ...data, details: content })}
          />
        </div>

        <div className="w-5/6 mt-10 mx-auto  w-100 flex flex-col md:flex-row justify-between my-4">
          <label className="w-1/5">Author</label>
          <input
            type="text"
            placeholder="(Optional)"
            value={data.author}
            className="w-100 md:w-4/5 border-2 py-1  px-1"
            onChange={(e) => setData({ ...data, author: e.target.value })}
          />
        </div>
        <div className="w-5/6 mx-auto  w-100 flex flex-col md:flex-row justify-between my-4">
          <label className="w-1/4">Category</label>
          {categoriesFetched && (
            <AutoComplete
              placeholderText="Enter a category and enter"
              tags={initialTags}
              suggestions={categoriesFetched}
              onTagsChanged={tagsChangeHandler}
              className="w-3/5 ml-7 border-2 py-1  px-1"
            />
          )}
        </div>
        <div className="w-5/6 mx-auto  w-100 flex flex-col md:flex-row justify-between my-4">
          <label className="w-1/5">ImageURL</label>
          <input
            type="text"
            value={data.imgUrl}
            className="w-100 md:w-4/5 border-2 w-100 py-1  px-1"
            onChange={(e) => setData({ ...data, imgUrl: e.target.value })}
          />
        </div>
      </form>
      <div className="w-5/6 mx-auto  w-100 flex flex-col md:flex-row justify-between my-4">
        <p
          className={styles.successMsg}
          style={{ display: successMsg ? "block" : "none" }}
        >
          <span> Post Added Successfully ✔️</span>
          <br />
          Click{" "}
          <Link href="/admin">
            <u style={{ cursor: "pointer" }}>here</u>
          </Link>{" "}
          to go back to admin console.
        </p>
      </div>
      <div className="w-5/6 mx-auto w-100  flex justify-end my-4">
        <button onClick={handleAddPost} className={styles.addPostBtn}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddPost;
