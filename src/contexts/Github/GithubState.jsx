import { useReducer } from "react";
import githubContext from "./GithubContext";
import githubReducer from "./GithubReducer";

function GithubState(props) {
  const initialValue = {
    loading: false,
    users: [],
    userDetail: {},
    userRepos: [],
    alert: { message: "" },
  };

  let [state, dispatch] = useReducer(githubReducer, initialValue);

  return (
    <>
      <githubContext.Provider
        value={{
          dispatch: dispatch,
          loading: state.loading,
          alert: state.alert,
          users: state.users,
          userDetail: state.userDetail,
          userRepos: state.userRepos,
        }}
      >
        {props.children}
      </githubContext.Provider>
    </>
  );
}

export default GithubState;
