import { useReducer } from "react";
import githubContext from "./GithubContext";
import githubReducer from "./GithubReducer";

function GithubState(props) {
  const initialValue = {
    loading: false,
    users: [],
    alert: false,
  };

  let [state, dispatch] = useReducer(githubReducer, initialValue);

  return (
    <>
      <githubContext.Provider
        value={{
          loading: state.loading,
        }}
      >
        {props.children}
      </githubContext.Provider>
    </>
  );
}

export default GithubState;
