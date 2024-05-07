import CONFIG from "../../config/config";
// import { BackwardIcon } from "@heroicons/react/24/outline";
import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserDetailsHeader from "./UserDetailsHeader";
import { SET_USER_DETAIL, SET_USER_REPOS } from "../../contexts/types";
import githubContext from "../../contexts/Github/GithubContext";

export default function UserDetail() {
  const { username } = useParams();
  const navigate = useNavigate();
  let { loading, userDetail, userRepos, dispatch } = useContext(githubContext);

  useEffect(() => {
    getUserData();
    getUserRepos();
  }, []);

  let auth = {
    username: CONFIG.GITHUB_USERNAME,
    password: CONFIG.GITHUB_PASSWORD,
  };

  async function getUserData() {
    let url = `https://api.github.com/users/${username}`;
    try {
      let res = await axios.get(url, { auth });
      dispatch({ type: SET_USER_DETAIL, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  async function getUserRepos() {
    let url = `https://api.github.com/users/${username}/repos`;
    try {
      let res = await axios.get(url, { auth });
      dispatch({ type: SET_USER_REPOS, payload: res.data });
      console.log("Repos ", res.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex min-h-full flex-col">
      <UserDetailsHeader />
      {userDetail == null ? (
        <h1> Loading ... </h1>
      ) : (
        <>
          <button onClick={() => navigate("/")}>Go back</button>
          <h1 className="text-slate-700 text-3xl">{userDetail.login}</h1>
          <img
            className="h-20 w-20 rounded-full bg-gray-800"
            src={userDetail.avatar_url}
            alt=""
          />
          {/* {JSON.stringify(userDetail)} */}
          <div>
            <span className="border mt-5 p-2 ">
              Following: {userDetail.following}
            </span>
            <span>Followers: {userDetail.followers}</span>
          </div>
        </>
      )}

      {userRepos.length == 0 ? (
        <h1> Fetching repositories ... </h1>
      ) : (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {userRepos.map((repo) => (
            <li
              key={repo.name}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <div className="flex flex-1 flex-col p-8 gap-2">
                <dt className="sr-only">Repo Name: </dt>

                <dd className="text-lg text-gray-900">{repo.name}</dd>
                <dd>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {repo.private ? "Private" : "Public"}
                  </span>
                </dd>
                <dd className="text-xs text-gray-500">
                  Updated on{" "}
                  {new Date(repo.updated_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </dd>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
