import CONFIG from "../config/config";
import Search from "./Search";
import SearchResults from "./SearchResults";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import githubContext from "../contexts/Github/GithubContext";
import { SET_LOADING, SET_USERS, SET_ALERT } from "../contexts/types";

function Home() {
  const [welcome, setWelcome] = useState(true);
  const { dispatch, loading, users, alert } = useContext(githubContext);

  let auth = {
    username: CONFIG.GITHUB_USERNAME,
    password: CONFIG.GITHUB_PASSWORD,
  };

  useEffect(() => {
    fetchWelcomeData();
  }, []);

  async function fetchDataFromGithub(username) {
    dispatch({ type: SET_LOADING });
    if (!username) {
      dispatch({
        type: SET_ALERT,
        payload: { type: "error", message: "Username cannot be blank." },
      });
      return;
    }
    let url = `https://api.github.com/search/users?q=${username}`;
    try {
      console.log(auth);
      let res = await axios.get(url, { auth });
      dispatch({ type: SET_USERS, payload: res.data.items });
      res.data.items.length > 0
        ? dispatch({
            type: SET_ALERT,
            payload: {
              type: "success",
              message: `Found ${res.data.items.length} results for "${username}"`,
            },
          })
        : dispatch({
            type: SET_ALERT,
            payload: {
              type: "info",
              message: `No results found for "${username}"`,
            },
          });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SET_ALERT,
        payload: { type: "error", message: err.response.data.message },
      });
    }
  }

  async function fetchWelcomeData() {
    let url = `https://api.github.com/users`;
    try {
      console.log("AUTH", auth);
      let res = await axios.get(url, { auth });
      dispatch({ type: SET_USERS, payload: res.data });
      setWelcome(true);
    } catch (err) {
      console.log(err);
      dispatch({
        type: SET_ALERT,
        payload: { type: "error", message: err.response.data.message },
      });
    }
  }

  return (
    <>
      <Search fetchDataFromGithub={fetchDataFromGithub} />
      {loading ? (
        <MagnifyingGlass
          visible={true}
          height="250"
          width="250"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      ) : welcome ? (
        <div>
          <p className="mt-5 text-sm  text-center text-gray-600">
            🌟 Browse through some popular Github profiles below 🌟
          </p>
          <SearchResults users={users} />
        </div>
      ) : (
        <div>
          <p className="mt-5 text-sm italic text-center text-gray-400">
            Showing search results
          </p>
          <SearchResults users={users} />
        </div>
      )}
    </>
  );
}

export default Home;
