import CONFIG from "../config/config";
import Search from "./Search";
import SearchResults from "./SearchResults";
import axios from "axios";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";

function Home({ alert, showAlert }) {
  const [welcome, setWelcome] = useState(true);
  const [results, setResults] = useState([]);

  let auth = {
    username: CONFIG.VITE_GITHUB_USERNAME,
    password: CONFIG.VITE_GITHUB_PASSWORD,
  };

  useEffect(() => {
    fetchWelcomeData();
  }, []);

  async function fetchDataFromGithub(username) {
    setLoading(true);
    if (!username) {
      showAlert({ type: "error", message: "Username cannot be blank." });
      setLoading(false);
      return;
    }
    let url = `https://api.github.com/search/users?q=${username}`;
    try {
      let res = await axios.get(url, { auth });

      setResults(res.data.items);
      res.data.items.length > 0
        ? showAlert({
            type: "success",
            message: `Found ${res.data.items.length} results for "${username}"`,
          })
        : showAlert({
            type: "info",
            message: `No results found for "${username}"`,
          });
    } catch (err) {
      console.log(err);
      showAlert({
        type: "error",
        message: err.response.data.message,
      });
    }
    setWelcome(false);
    setLoading(false);
  }

  async function fetchWelcomeData() {
    let url = `https://api.github.com/users`;
    try {
      let res = await axios.get(url, { auth });
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Search fetchDataFromGithub={fetchDataFromGithub} alert={alert} />
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
          <SearchResults users={results} />
        </div>
      ) : (
        <div>
          <p className="mt-5 text-sm italic text-center text-gray-400">
            Showing search results
          </p>
          <SearchResults users={results} />
        </div>
      )}
    </>
  );
}

export default Home;
