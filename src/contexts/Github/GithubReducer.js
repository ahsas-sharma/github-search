// import "../types";
import { SET_LOADING } from "../types";

const GithubReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      break;
  }
};

export default GithubReducer;
