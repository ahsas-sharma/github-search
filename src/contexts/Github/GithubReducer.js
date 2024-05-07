// import "../types";
import {
  SET_LOADING,
  SET_ALERT,
  SET_USERS,
  SET_USER_DETAIL,
  SET_USER_REPOS,
} from "../types";

const GithubReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ALERT:
      return {
        ...state,
        loading: false,
        alert: action.payload,
      };
    case SET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case SET_USER_DETAIL:
      return {
        ...state,
        loading: false,
        userDetail: action.payload,
      };
    case SET_USER_REPOS:
      return {
        ...state,
        loading: true,
        userRepos: action.payload,
      };
    default:
      break;
  }
};

export default GithubReducer;
