import React, { useContext, useState } from "react";
import styles from "./style.module.scss";
import GenerateCoinBtn from "../../components/GenerateCoinBtn/GenerateCoinBtn";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import { UserContext as AppContext } from "./../../app/state/contexts/userContext";
import { getCookie, setCookie } from "cookies-next";
import Countdown from "react-countdown";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
function News() {
  const [targetPost, setTargetPost] = React.useState();
  const [state, dispatch] = useContext(AppContext);
  const [checkAccMsg, setCheckAccMsg] = useState("Check My Account");
  const [status, setStatus] = React.useState("");
  const [collectingCoin, setCollectingCoin] = React.useState(false);
  const [isFetching, setFetching] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;
  React.useEffect(() => {
    // !window.adsbygoogle
    //   ? (window.adsbygoogle = window.adsbygoogle || []).push({})
    //   : console.log("Adsbygoogle already exists");
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/posts";
    (async () => {
      setFetching(true);
      axios.get(url).then((res) => {
        dispatch({ type: "setposts", payload: res.data.data });
        setFetching(false);
      });
    })();
    const urlCat = process.env.NEXT_PUBLIC_HOST_URL + "/posts/categories";
    (async () => {
      setFetching(true);
      axios.get(urlCat).then((res) => {
        dispatch({ type: "set-categories", payload: res.data.data });
        setFetching(false);
      });
    })();
    const urlCatPosts =
      process.env.NEXT_PUBLIC_HOST_URL + "/posts/categoryPosts";
    (async () => {
      setFetching(true);
      axios.get(urlCatPosts).then((res) => {
        dispatch({ type: "set-category-posts", payload: res.data.data });
        setFetching(false);
      });
    })();
    console.log("state", state);
  }, [id]);
  React.useEffect(() => {
    // !window.adsbygoogle
    //   ? (window.adsbygoogle = window.adsbygoogle || []).push({})
    //   : console.log("Adsbygoogle already exists");
    setStatus(localStorage.getItem("mozilla-support-status"));
    console.log("state", state);
    // if (state.posts.length > 0) {
    //   return;
    // }
    // const url = process.env.NEXT_PUBLIC_HOST_URL + "/posts";
    // (async () => {
    //   setFetching(true);
    //   axios.get(url).then((res) => {
    //     dispatch({ type: "setposts", payload: res.data.data });
    //     setFetching(false);
    //   });
    // })();
    debugger;
    setTargetPost(getPost(id));
  }, [id, state]);

  function getEquivalentSlug(title) {
    let slug = "";
    let oldTitle = title;
    for (let i = 0; i < oldTitle.length; i++) {
      if (oldTitle[i] == " ") {
        slug += "-";
      } else {
        slug += oldTitle[i]?.toLowerCase();
      }
    }
    if (slug.substr(slug.length - 1) === "?")
      slug = slug.substr(0, slug.length - 1);
    return slug;
  }

  function getPost(postSlug) {
    debugger;
    const allPosts = state.posts;
    let post = null;
    for (let i = 0; i < allPosts.length; i++) {
      debugger;
      const slug = getEquivalentSlug(allPosts[i].data.title);
      if (slug == postSlug) {
        post = allPosts[i];
        break;
      }
    }
    return post;
  }
  if (isFetching) {
    return <p>Loading...</p>;
  }
  // const targetPost = getPost(id);
  function handleClickCollectCoin() {
    setCollectingCoin(true);
    // Increment Coin in user profile...
    const uid = localStorage.getItem("uad-cache");
    if (uid.length == 28) {
      const url = process.env.NEXT_PUBLIC_HOST_URL + "/users/ic";
      axios.post(url, { uid }).then((res) => {
        if (res.data.status == "error") {
          setCheckAccMsg("Coin not collected. Try Again");
        }
      });
    }
  }
  const Completionist = () => (
    <a
      href="#footer"
      onClick={handleClickCollectCoin}
      className={styles.collectCoinBtn}
    >
      Collect Coin
    </a>
  );
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <h2 style={{ color: "red" }}>
          Generating coin... {seconds} Seconds...
        </h2>
      );
    }
  };

  function transferFunds() {
    setCookie("token", "0x0000000000000000000000000000000000000000", {
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  const Completionist2 = () => {
    localStorage.removeItem("mozilla-support-status");
    return (
      <a
        href={process.env.NEXT_PUBLIC_APP_URL}
        onClick={transferFunds}
        className={styles.collectCoinBtn}
      >
        {checkAccMsg}
      </a>
    );
  };
  const renderer2 = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist2 />;
    } else {
      // Render a countdown
      return (
        <h2 style={{ color: "red" }}>
          Transferring in Your Account... {seconds} Seconds...
        </h2>
      );
    }
  };
  function createMarkup() {
    // console.log("data.details", data.details);
    // const p = document.createElement("p");
    // p.innerHTML = data?.details || "";

    // return p.innerText;
    return {
      __html: targetPost.data.details,
    };
  }
  if (targetPost) {
    return (
      <>
        <Head>
          <title>{targetPost.data.title}</title>
        </Head>
        <div className="flex px-3 md:px-0 md:flex-row flex-col gap-3  bg-[#F2F2F0]">
          {status == "4" && !collectingCoin ? (
            <Countdown date={Date.now() + 20000} renderer={renderer} />
          ) : (
            ""
          )}
          {/* <Ad /> */}
          <div className="w-full md:w-1/4 pt-3  bg-[#F2F2F0]"></div>
          <div className="sm:w-full md:flex-1 md:min-h-[80vh]  bg-white px-2">
            <h3 className="text-4xl py-3 capitalize">
              {targetPost.data.title}
            </h3>
            <img
              src={targetPost.data.imgUrl}
              className="w-full object-cover  md:max-h-[25rem]"
            />
            <p
              style={{ textAlign: "justify" }}
              dangerouslySetInnerHTML={createMarkup()}
            />
          </div>
          <div className="md:w-1/7 bg-[#F2F2F0]"> advertisement</div>
          {/* <p style={{ textAlign: "center" }}>{targetPost.data.details}</p> */}
          {/* <Ad /> */}
        </div>

        <footer id="footer">
          {/* <Ad1 /> */}
          {collectingCoin ? (
            <Countdown date={Date.now() + 5000} renderer={renderer2} />
          ) : (
            ""
          )}
          {/* <Ad2 /> */}
        </footer>
      </>
    );
  } else {
    return <></>;
  }
}

export default News;
