import CONFIG from "../config/config";
import Search from "./Search";
import SearchResults from "./SearchResults";
import axios from "axios";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";

function Home() {
  const [welcome, setWelcome] = useState(true);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  let auth = {
    username: CONFIG.VITE_GITHUB_USERNAME,
    password: CONFIG.VITE_GITHUB_PASSWORD,
  };

  useEffect(() => {
    fetchWelcomeData();
  }, []);

  async function fetchDataFromGithub(username) {
    setLoading(true);
    let url = `https://api.github.com/search/users?q=${username}`;
    try {
      let res = await axios.get(url, { auth });
      setResults(res.data.items);
    } catch (err) {
      console.log(err);
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
          <p className="mt-5 text-sm italic text-center text-gray-400">
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
